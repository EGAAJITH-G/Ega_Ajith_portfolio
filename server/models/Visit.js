import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

// TTL index: Mongoose will automatically delete the visit document after 30 days
visitSchema.index({ timestamp: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

export default mongoose.model('Visit', visitSchema);
