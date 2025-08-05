import { asyncHandler } from '../utils/asyncHandler.js';
import FeedLog from '../models/FeedLog.js';
import SleepLog from '../models/SleepLog.js';

// FeedLog Controllers

// Create a new feed log
export const createFeedLog = asyncHandler(async (req, res) => {
  const { feedingTime, amount, feedingType } = req.body;
  const userId = req.user._id;

  const feedLog = new FeedLog({
    user: userId,
    feedingTime,
    amount,
    feedingType,
  });

  await feedLog.save();
  res.status(201).json(feedLog);
});

// Get all feed logs for the logged-in user
export const getFeedLogs = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const feedLogs = await FeedLog.find({ user: userId }).sort({ feedingTime: -1 });
  res.json(feedLogs);
});

// Update a feed log by ID
export const updateFeedLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { feedingTime, amount, feedingType } = req.body;
  const userId = req.user._id;

  const feedLog = await FeedLog.findOne({ _id: id, user: userId });
  if (!feedLog) {
    return res.status(404).json({ message: 'Feed log not found' });
  }

  feedLog.feedingTime = feedingTime || feedLog.feedingTime;
  feedLog.amount = amount || feedLog.amount;
  feedLog.feedingType = feedingType || feedLog.feedingType;

  await feedLog.save();
  res.json(feedLog);
});

// Delete a feed log by ID
export const deleteFeedLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const feedLog = await FeedLog.findOneAndDelete({ _id: id, user: userId });
  if (!feedLog) {
    return res.status(404).json({ message: 'Feed log not found' });
  }

  res.json({ message: 'Feed log deleted' });
});

// SleepLog Controllers

// Create a new sleep log
export const createSleepLog = asyncHandler(async (req, res) => {
  const { sleepStart, sleepEnd, notes } = req.body;
  const userId = req.user._id;

  const sleepLog = new SleepLog({
    user: userId,
    sleepStart,
    sleepEnd,
    notes,
  });

  await sleepLog.save();
  res.status(201).json(sleepLog);
});

// Get all sleep logs for the logged-in user
export const getSleepLogs = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const sleepLogs = await SleepLog.find({ user: userId }).sort({ sleepStart: -1 });
  res.json(sleepLogs);
});

// Update a sleep log by ID
export const updateSleepLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { sleepStart, sleepEnd, notes } = req.body;
  const userId = req.user._id;

  const sleepLog = await SleepLog.findOne({ _id: id, user: userId });
  if (!sleepLog) {
    return res.status(404).json({ message: 'Sleep log not found' });
  }

  sleepLog.sleepStart = sleepStart || sleepLog.sleepStart;
  sleepLog.sleepEnd = sleepEnd || sleepLog.sleepEnd;
  sleepLog.notes = notes || sleepLog.notes;

  await sleepLog.save();
  res.json(sleepLog);
});

// Delete a sleep log by ID
export const deleteSleepLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const sleepLog = await SleepLog.findOneAndDelete({ _id: id, user: userId });
  if (!sleepLog) {
    return res.status(404).json({ message: 'Sleep log not found' });
  }

  res.json({ message: 'Sleep log deleted' });
});
