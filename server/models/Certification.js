import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  credId: {
    type: String,
    default: ''
  },
  image: {
    type: String, // Can store base64 string or URL
    default: ''
  },
  link: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Certification', certificationSchema);
