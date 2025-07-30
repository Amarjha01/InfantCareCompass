import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    subscribedAt: { type: Date, default: Date.now },
})

const subscriberModel = new mongoose.model('subscriberInfos', subscriberSchema);

export default subscriberModel;