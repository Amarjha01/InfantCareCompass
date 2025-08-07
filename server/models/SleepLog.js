import mongoose from 'mongoose';

const sleepLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sleepStart: { type: Date, required: true },
  sleepEnd: { type: Date, required: true },
  notes: { type: String },
}, { timestamps: true });

const SleepLog = mongoose.model('SleepLog', sleepLogSchema);

export default SleepLog;
