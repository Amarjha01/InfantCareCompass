import mongoose from 'mongoose';

const growthLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  childId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  height_cm: {
    type: Number,
    required: true,
    min: 0,
    max: 200
  },
  weight_kg: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  milestone: {
    type: String,
    trim: true,
    maxlength: 500
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  reminderEnabled: {
    type: Boolean,
    default: true
  },
  reminderFrequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'weekly'
  }
}, {
  timestamps: true
});

// Index for efficient querying
growthLogSchema.index({ userId: 1, childId: 1, date: -1 });

const GrowthLog = mongoose.model('GrowthLog', growthLogSchema);

export default GrowthLog;
