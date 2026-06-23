import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajith_portfolio';

const run = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to DB.');
  
  const projects = await Project.find();
  console.log(`Found ${projects.length} projects in DB.`);
  
  projects.forEach((p, i) => {
    console.log(`\nProject ${i + 1}: ${p.title}`);
    console.log(`  Category: ${p.category}`);
    console.log(`  Active: ${p.active}`);
    console.log(`  Image field length: ${p.image ? p.image.length : 0}`);
    console.log(`  Image start: ${p.image ? p.image.substring(0, 80) : 'empty'}`);
  });

  await mongoose.connection.close();
};

run().catch(console.error);
