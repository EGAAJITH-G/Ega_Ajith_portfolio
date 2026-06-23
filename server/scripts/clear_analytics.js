import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Analytics from '../models/Analytics.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajith_portfolio';

const clearAnalytics = async () => {
  console.log('[CLEAR] Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('[CLEAR] MongoDB connected.');

  console.log('[CLEAR] Resetting visitor stats...');
  const result = await Analytics.deleteOne({ key: 'visitor_stats' });
  console.log('[CLEAR] Visitor stats document deleted:', result);

  console.log('[CLEAR] Re-initializing empty stats...');
  const emptyStats = new Analytics({
    key: 'visitor_stats',
    views: 0,
    uniqueVisitors: 0,
    desktopCount: 0,
    mobileCount: 0,
    uniqueIps: [],
    recentVisits: []
  });
  await emptyStats.save();
  console.log('[CLEAR] Empty visitor stats initialized.');
};

clearAnalytics()
  .then(() => {
    mongoose.connection.close();
    console.log('[CLEAR] Done.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[CLEAR ERROR]', err);
    process.exit(1);
  });
