import mongoose from 'mongoose';

const feedLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  feedingTime: { type: Date, required: true },
  amount: { type: Number, required: true },
  feedingType: { type: String, enum: ['bottle', 'breastfeed', 'solid'], required: true },
}, { timestamps: true });

const FeedLog = mongoose.model('FeedLog', feedLogSchema);

export default FeedLog;
