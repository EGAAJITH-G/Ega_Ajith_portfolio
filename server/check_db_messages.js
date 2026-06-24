import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Message from './models/Message.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajith_portfolio';

const run = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to DB.');
  
  const messages = await Message.find();
  console.log(`Found ${messages.length} messages in DB.`);
  
  messages.forEach((m, i) => {
    console.log(`\nMessage ${i + 1}:`);
    console.log(`  Name: ${m.name}`);
    console.log(`  Email: ${m.email}`);
    console.log(`  Message: ${m.message}`);
    console.log(`  isRead: ${m.isRead}`);
    console.log(`  CreatedAt: ${m.createdAt}`);
  });

  await mongoose.connection.close();
};

run().catch(console.error);
