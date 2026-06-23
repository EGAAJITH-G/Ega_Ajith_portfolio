import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    required: true // 'frontend', 'backend', 'tools'
  },
  color: {
    type: String,
    default: '#00f5ff'
  },
  desc: {
    type: String,
    default: ''
  },
  svgPath: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
