import GrowthLog from '../models/GrowthLog.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create a new growth log entry
export const createGrowthLog = asyncHandler(async (req, res) => {
  const { childId, height_cm, weight_kg, milestone, notes, date } = req.body;
  const userId = req.user.id;

  // Validate required fields
  if (!childId || !height_cm || !weight_kg) {
    return res.status(400).json({
      success: false,
      message: 'Child ID, height, and weight are required'
    });
  }

  // Validate data ranges
  if (height_cm < 0 || height_cm > 200) {
    return res.status(400).json({
      success: false,
      message: 'Height must be between 0 and 200 cm'
    });
  }

  if (weight_kg < 0 || weight_kg > 100) {
    return res.status(400).json({
      success: false,
      message: 'Weight must be between 0 and 100 kg'
    });
  }

  const growthLog = await GrowthLog.create({
    userId,
    childId,
    height_cm,
    weight_kg,
    milestone,
    notes,
    date: date || new Date()
  });

  res.status(201).json({
    success: true,
    data: growthLog,
    message: 'Growth log created successfully'
  });
});

// Get all growth logs for a user
export const getGrowthLogs = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { childId, limit = 50, sort = 'desc' } = req.query;

  const query = { userId };
  if (childId) {
    query.childId = childId;
  }

  const sortOrder = sort === 'asc' ? 1 : -1;

  const growthLogs = await GrowthLog.find(query)
    .sort({ date: sortOrder })
    .limit(parseInt(limit))
    .select('-__v');

  res.status(200).json({
    success: true,
    count: growthLogs.length,
    data: growthLogs
  });
});

// Get a specific growth log by ID
export const getGrowthLogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const growthLog = await GrowthLog.findOne({ _id: id, userId });

  if (!growthLog) {
    return res.status(404).json({
      success: false,
      message: 'Growth log not found'
    });
  }

  res.status(200).json({
    success: true,
    data: growthLog
  });
});

// Update a growth log
export const updateGrowthLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { height_cm, weight_kg, milestone, notes, date } = req.body;

  // Validate data ranges if provided
  if (height_cm !== undefined && (height_cm < 0 || height_cm > 200)) {
    return res.status(400).json({
      success: false,
      message: 'Height must be between 0 and 200 cm'
    });
  }

  if (weight_kg !== undefined && (weight_kg < 0 || weight_kg > 100)) {
    return res.status(400).json({
      success: false,
      message: 'Weight must be between 0 and 100 kg'
    });
  }

  const growthLog = await GrowthLog.findOneAndUpdate(
    { _id: id, userId },
    { height_cm, weight_kg, milestone, notes, date },
    { new: true, runValidators: true }
  );

  if (!growthLog) {
    return res.status(404).json({
      success: false,
      message: 'Growth log not found'
    });
  }

  res.status(200).json({
    success: true,
    data: growthLog,
    message: 'Growth log updated successfully'
  });
});

// Delete a growth log
export const deleteGrowthLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const growthLog = await GrowthLog.findOneAndDelete({ _id: id, userId });

  if (!growthLog) {
    return res.status(404).json({
      success: false,
      message: 'Growth log not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Growth log deleted successfully'
  });
});

// Update reminder settings
export const updateReminderSettings = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { childId, reminderEnabled, reminderFrequency } = req.body;

  if (!childId) {
    return res.status(400).json({
      success: false,
      message: 'Child ID is required'
    });
  }

  // Update all logs for this child with new reminder settings
  const result = await GrowthLog.updateMany(
    { userId, childId },
    { reminderEnabled, reminderFrequency }
  );

  res.status(200).json({
    success: true,
    message: 'Reminder settings updated successfully',
    updatedCount: result.modifiedCount
  });
});

// Get growth statistics
export const getGrowthStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { childId } = req.query;

  if (!childId) {
    return res.status(400).json({
      success: false,
      message: 'Child ID is required'
    });
  }

  const logs = await GrowthLog.find({ userId, childId })
    .sort({ date: 1 })
    .select('height_cm weight_kg date');

  if (logs.length === 0) {
    return res.status(200).json({
      success: true,
      data: {
        totalEntries: 0,
        averageHeight: 0,
        averageWeight: 0,
        heightGrowth: 0,
        weightGrowth: 0,
        growthRate: 0
      }
    });
  }

  const totalEntries = logs.length;
  const averageHeight = logs.reduce((sum, log) => sum + log.height_cm, 0) / totalEntries;
  const averageWeight = logs.reduce((sum, log) => sum + log.weight_kg, 0) / totalEntries;

  // Calculate growth over time
  const firstLog = logs[0];
  const lastLog = logs[logs.length - 1];
  const heightGrowth = lastLog.height_cm - firstLog.height_cm;
  const weightGrowth = lastLog.weight_kg - firstLog.weight_kg;

  // Calculate growth rate (cm per month)
  const timeDiff = (lastLog.date - firstLog.date) / (1000 * 60 * 60 * 24 * 30); // months
  const growthRate = timeDiff > 0 ? heightGrowth / timeDiff : 0;

  res.status(200).json({
    success: true,
    data: {
      totalEntries,
      averageHeight: Math.round(averageHeight * 100) / 100,
      averageWeight: Math.round(averageWeight * 100) / 100,
      heightGrowth: Math.round(heightGrowth * 100) / 100,
      weightGrowth: Math.round(weightGrowth * 100) / 100,
      growthRate: Math.round(growthRate * 100) / 100,
      firstEntry: firstLog.date,
      lastEntry: lastLog.date
    }
  });
});
