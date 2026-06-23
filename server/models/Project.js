import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'frontend' // 'frontend', 'fullstack', etc.
  },
  tags: {
    type: [String],
    default: []
  },
  github: {
    type: String,
    default: ''
  },
  live: {
    type: String,
    default: ''
  },
  image: {
    type: String, // Can store base64 string or image URL
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  },
  stars: {
    type: Number,
    default: 0
  },
  forks: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  header: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
