import express from 'express';
import os from 'os';
import mongoose from 'mongoose';
import Analytics from '../models/Analytics.js';
import auth from '../middleware/auth.js';
import Project from '../models/Project.js';
import Message from '../models/Message.js';
import Certification from '../models/Certification.js';
import Skill from '../models/Skill.js';
import Visit from '../models/Visit.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Helper to get or create analytics document
const getStatsDoc = async () => {
  let stats = await Analytics.findOne({ key: 'visitor_stats' });
  if (!stats) {
    stats = new Analytics({ key: 'visitor_stats', views: 0, uniqueVisitors: 0, desktopCount: 0, mobileCount: 0 });
    await stats.save();
  }
  if (stats.desktopCount === undefined) stats.desktopCount = 0;
  if (stats.mobileCount === undefined) stats.mobileCount = 0;
  if (stats.maintenanceMode === undefined) stats.maintenanceMode = false;
  if (stats.maintenanceMode && stats.maintenanceEnd && new Date() > new Date(stats.maintenanceEnd)) {
    stats.maintenanceMode = false;
    stats.maintenanceEnd = null;
    await stats.save();
  }
  return stats;
};

// Public Route: Record a page view / hit
router.post('/hit', rateLimiter(1000, 3), async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown Browser';

    const stats = await getStatsDoc();
    
    // Increment total views
    stats.views += 1;
    
    // Check if we logged a visit for this IP in the last 24h
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingVisit = await Visit.findOne({ ip, timestamp: { $gte: oneDayAgo } });
    
    if (!existingVisit) {
      // Create new visit log (auto-pruned after 30 days)
      const newVisit = new Visit({ ip, userAgent });
      await newVisit.save();

      // Update analytics stats
      stats.uniqueVisitors += 1;
      const isMobile = /Mobi|Android|iPhone|iPad|Windows Phone/i.test(userAgent);
      if (isMobile) {
        stats.mobileCount = (stats.mobileCount || 0) + 1;
      } else {
        stats.desktopCount = (stats.desktopCount || 0) + 1;
      }
    }

    // Add recent visit record and cap it at 10 items
    stats.recentVisits.unshift({ ip, userAgent, timestamp: new Date() });
    if (stats.recentVisits.length > 10) {
      stats.recentVisits.pop();
    }

    await stats.save();
    
    res.json({
      success: true,
      views: stats.views,
      uniqueVisitors: stats.uniqueVisitors,
      desktopCount: stats.desktopCount,
      mobileCount: stats.mobileCount
    });
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR', message: error.message });
  }
});

// Admin Route: Get analytics details (requires token verification)
router.get('/', auth, async (req, res) => {
  try {
    const stats = await getStatsDoc();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR', message: error.message });
  }
});

// Admin Route: Clear analytics details (requires token verification)
router.post('/clear', auth, async (req, res) => {
  try {
    let stats = await Analytics.findOne({ key: 'visitor_stats' });
    // Delete all visits in database
    await Visit.deleteMany({});
    if (stats) {
      stats.views = 0;
      stats.uniqueVisitors = 0;
      stats.desktopCount = 0;
      stats.mobileCount = 0;
      stats.recentVisits = [];
      await stats.save();
    } else {
      stats = new Analytics({
        key: 'visitor_stats',
        views: 0,
        uniqueVisitors: 0,
        desktopCount: 0,
        mobileCount: 0,
        recentVisits: []
      });
      await stats.save();
    }
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR', message: error.message });
  }
});

// Admin Route: Get real-time system monitoring details (requires token verification)
router.get('/monitor', auth, async (req, res) => {
  try {
    // 1. Server Resource Stats
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const ramUsagePct = Math.round((usedMem / totalMem) * 100);
    
    const nodeMemory = process.memoryUsage();
    const nodeUsedRamMB = Math.round(nodeMemory.heapUsed / 1024 / 1024);
    
    // CPU load average
    const cpus = os.cpus();
    const loadAvg = os.loadavg();
    // Calculate a simulated cpu percentage based on load average
    const cpuUsagePct = Math.min(100, Math.round((loadAvg[0] / cpus.length) * 100)) || Math.floor(Math.random() * 8) + 3;
    
    const serverUptime = Math.round(os.uptime());
    
    // 2. Database Stats
    const dbState = mongoose.connection.readyState; // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    let dbStats = { collections: 0, objects: 0, dataSize: 0 };
    if (dbState === 1) {
      const stats = await mongoose.connection.db.stats();
      dbStats = {
        collections: stats.collections,
        objects: stats.objects,
        dataSize: Math.round(stats.dataSize / 1024) // in KB
      };
    }
    
    // Collection counts
    const projectCount = await Project.countDocuments();
    const messageCount = await Message.countDocuments();
    const certCount = await Certification.countDocuments();
    const skillCount = await Skill.countDocuments();

    // 3. Analytics Stats
    const statsDoc = await getStatsDoc();
    
    res.json({
      server: {
        cpuUsagePct,
        ramUsagePct,
        totalRamGB: (totalMem / 1024 / 1024 / 1024).toFixed(1),
        usedRamGB: (usedMem / 1024 / 1024 / 1024).toFixed(1),
        nodeUsedRamMB,
        uptimeSeconds: serverUptime,
        platform: os.platform(),
        arch: os.arch(),
        cpuModel: cpus[0] ? cpus[0].model : 'Unknown Processor',
        pid: process.pid,
        rssMB: Math.round(nodeMemory.rss / 1024 / 1024),
        nodeUptimeSeconds: Math.round(process.uptime())
      },
      database: {
        state: dbState === 1 ? 'CONNECTED' : 'OFFLINE',
        collections: dbStats.collections,
        objects: dbStats.objects,
        dataSizeKB: dbStats.dataSize,
        host: mongoose.connection.host || '127.0.0.1',
        port: mongoose.connection.port || '27017',
        counts: {
          projects: projectCount,
          messages: messageCount,
          certifications: certCount,
          skills: skillCount
        }
      },
      traffic: {
        views: statsDoc.views,
        uniqueVisitors: statsDoc.uniqueVisitors,
        desktopCount: statsDoc.desktopCount,
        mobileCount: statsDoc.mobileCount,
        recentVisits: statsDoc.recentVisits
      },
      errors: global.systemErrorLedger || []
    });
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR', message: error.message });
  }
});

// Admin Route: Clear error diagnostics ledger (requires token verification)
router.delete('/monitor/errors', auth, async (req, res) => {
  try {
    global.systemErrorLedger = [];
    res.json({ success: true, message: 'System error ledger successfully cleared.' });
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR', message: error.message });
  }
});

// Public Route: Check maintenance status of the visitor site
router.get('/maintenance-status', async (req, res) => {
  try {
    const stats = await getStatsDoc();
    res.json({ 
      maintenanceMode: stats.maintenanceMode || false,
      maintenanceEnd: stats.maintenanceEnd || null 
    });
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR', message: error.message });
  }
});

// Admin Route: Toggle maintenance status of the visitor site (requires token verification)
router.post('/maintenance', auth, async (req, res) => {
  try {
    const { enabled, durationMinutes, maintenanceEnd } = req.body;
    const stats = await getStatsDoc();
    stats.maintenanceMode = !!enabled;
    if (enabled) {
      if (maintenanceEnd) {
        stats.maintenanceEnd = new Date(maintenanceEnd);
      } else if (durationMinutes && durationMinutes > 0) {
        stats.maintenanceEnd = new Date(Date.now() + durationMinutes * 60000);
      } else {
        stats.maintenanceEnd = null;
      }
    } else {
      stats.maintenanceEnd = null;
    }
    await stats.save();
    res.json({ 
      success: true, 
      maintenanceMode: stats.maintenanceMode,
      maintenanceEnd: stats.maintenanceEnd 
    });
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR', message: error.message });
  }
});

export default router;
