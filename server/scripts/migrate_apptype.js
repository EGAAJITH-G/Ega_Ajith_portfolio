import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajith_portfolio';

const run = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to DB.');
  
  const result = await Project.updateMany(
    { appType: { $exists: false } },
    { $set: { appType: 'Web Application' } }
  );
  
  console.log(`Matched ${result.matchedCount} and modified ${result.modifiedCount} project documents.`);

  // Also update projects that have empty string appType to 'Web Application' for visual demonstration
  const emptyResult = await Project.updateMany(
    { appType: '' },
    { $set: { appType: 'Web Application' } }
  );
  console.log(`Updated ${emptyResult.modifiedCount} project documents with empty appType to 'Web Application'.`);

  await mongoose.connection.close();
};

run().catch(console.error);
