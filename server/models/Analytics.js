import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'visitor_stats'
  },
  views: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  desktopCount: {
    type: Number,
    default: 0
  },
  mobileCount: {
    type: Number,
    default: 0
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maintenanceEnd: {
    type: Date,
    default: null
  },
  recentVisits: [
    {
      ip: String,
      userAgent: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);
