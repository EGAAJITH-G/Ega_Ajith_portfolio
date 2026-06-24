import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Jimp, JimpMime } from 'jimp';
import Project from '../models/Project.js';
import Certification from '../models/Certification.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajith_portfolio';

const compressImage = async (base64Str) => {
  if (!base64Str || typeof base64Str !== 'string' || !base64Str.startsWith('data:image/')) {
    return null; // Not a base64 image
  }

  if (base64Str.includes('image/svg+xml')) {
    return null; // Don't compress SVGs
  }

  const originalSize = base64Str.length;
  if (originalSize < 100 * 1024) {
    return null; // Already small enough (< 100KB)
  }

  try {
    const base64Data = base64Str.split(',')[1];
    if (!base64Data) return null;

    const buffer = Buffer.from(base64Data, 'base64');
    const image = await Jimp.read(buffer);

    // Resize if width is greater than 1000px
    if (image.width > 1000) {
      image.resize({ w: 1000 });
    }

    // Compress to JPEG with 70% quality using the Jimp v1 options pattern
    const compressedBuffer = await image.getBuffer(JimpMime.jpeg, { quality: 70 });
    const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

    if (compressedBase64.length < originalSize) {
      return compressedBase64;
    }
    return null;
  } catch (err) {
    console.error(`  [ERROR COMPRESSING]: ${err.message}`);
    return null;
  }
};

const run = async () => {
  console.log('Connecting to database...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to database successfully.');

  let totalProjectsProcessed = 0;
  let totalCertsProcessed = 0;
  let totalSpaceSavedBytes = 0;

  // 1. Optimize Projects
  console.log('\n--- Optimizing Project Images ---');
  const projects = await Project.find();
  console.log(`Found ${projects.length} projects in database.`);

  for (const project of projects) {
    const imgStr = project.image;
    if (imgStr) {
      const originalLen = imgStr.length;
      console.log(`Checking project: "${project.title}" (Current image length: ${originalLen} chars)`);
      
      const compressedImg = await compressImage(imgStr);
      if (compressedImg) {
        const compressedLen = compressedImg.length;
        const saved = originalLen - compressedLen;
        totalSpaceSavedBytes += saved;
        
        project.image = compressedImg;
        await project.save();
        totalProjectsProcessed++;
        
        console.log(`  -> COMPRESSED: ${originalLen} -> ${compressedLen} chars (Saved ${(saved / 1024).toFixed(2)} KB, -${((saved / originalLen) * 100).toFixed(1)}%)`);
      } else {
        console.log('  -> Skipped (already small, SVG, or not base64)');
      }
    } else {
      console.log(`Checking project: "${project.title}" (No image present)`);
    }
  }

  // 2. Optimize Certifications
  console.log('\n--- Optimizing Certification Images ---');
  const certs = await Certification.find();
  console.log(`Found ${certs.length} certifications in database.`);

  for (const cert of certs) {
    const imgStr = cert.image;
    if (imgStr) {
      const originalLen = imgStr.length;
      console.log(`Checking certification: "${cert.title}" (Current image length: ${originalLen} chars)`);
      
      const compressedImg = await compressImage(imgStr);
      if (compressedImg) {
        const compressedLen = compressedImg.length;
        const saved = originalLen - compressedLen;
        totalSpaceSavedBytes += saved;
        
        cert.image = compressedImg;
        await cert.save();
        totalCertsProcessed++;
        
        console.log(`  -> COMPRESSED: ${originalLen} -> ${compressedLen} chars (Saved ${(saved / 1024).toFixed(2)} KB, -${((saved / originalLen) * 100).toFixed(1)}%)`);
      } else {
        console.log('  -> Skipped (already small, SVG, or not base64)');
      }
    } else {
      console.log(`Checking certification: "${cert.title}" (No image present)`);
    }
  }

  console.log('\n======================================');
  console.log('Migration Completed Successfully!');
  console.log(`- Projects updated: ${totalProjectsProcessed}`);
  console.log(`- Certifications updated: ${totalCertsProcessed}`);
  console.log(`- Total characters saved in DB: ${totalSpaceSavedBytes} (~${(totalSpaceSavedBytes / 1024 / 1024).toFixed(2)} MB)`);
  console.log('======================================');

  await mongoose.connection.close();
  console.log('Database connection closed.');
};

run().catch(async (err) => {
  console.error('Fatal Migration Error:', err);
  await mongoose.connection.close();
  process.exit(1);
});
