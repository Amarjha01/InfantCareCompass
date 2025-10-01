import doctormodel from '../../models/user/doctorSchema.js';
import userModel from '../../models/user/user.js';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const reviewDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: true, message: "Invalid status" });
    }

    const updatedDoctor = await doctormodel.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: true, message: "Doctor not found" });
    }

    res.status(200).json({
      message: `Doctor status updated to ${status}`,
      data: updatedDoctor,
      success: true
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
      success: false
    });
  }
};

// Get admin dashboard analytics
export const getDashboardAnalytics = asyncHandler(async (req, res) => {
  try {
    // Get user statistics
    const totalUsers = await userModel.countDocuments();
    const totalDoctors = await doctormodel.countDocuments();
    const pendingDoctors = await doctormodel.countDocuments({ status: 'pending' });
    const approvedDoctors = await doctormodel.countDocuments({ status: 'approved' });

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // For now, we'll use placeholder data since we don't have createdAt fields
    // In a real implementation, you'd add timestamps to your models
    const recentUsers = totalUsers; // Placeholder
    const recentDoctors = totalDoctors; // Placeholder

    // Get consultation statistics (placeholder - you'd need a consultation model)
    const totalConsultations = 0; // Placeholder
    const activeConsultations = 0; // Placeholder

    const analytics = {
      users: {
        total: totalUsers,
        recent: recentUsers,
        growth: 0 // Calculate growth percentage
      },
      doctors: {
        total: totalDoctors,
        pending: pendingDoctors,
        approved: approvedDoctors,
        recent: recentDoctors
      },
      consultations: {
        total: totalConsultations,
        active: activeConsultations,
        completed: 0
      },
      system: {
        totalRevenue: 0, // Placeholder for future monetization
        activeUsers: totalUsers + totalDoctors
      }
    };

    res.status(200).json({
      message: "Dashboard analytics retrieved successfully",
      data: analytics,
      success: true
    });

  } catch (error) {
    console.error("Dashboard analytics error:", error);
    res.status(500).json({
      message: "Failed to retrieve dashboard analytics",
      error: error.message,
      success: false
    });
  }
});

// Get all users for admin management
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await userModel.find({}, '-password').sort({ createdAt: -1 });
    
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
      success: true
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      message: "Failed to retrieve users",
      error: error.message,
      success: false
    });
  }
});

// Get all doctors for admin management
export const getAllDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await doctormodel.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      message: "Doctors retrieved successfully",
      data: doctors,
      success: true
    });
  } catch (error) {
    console.error("Get all doctors error:", error);
    res.status(500).json({
      message: "Failed to retrieve doctors",
      error: error.message,
      success: false
    });
  }
});

// Update user status (for admin management)
export const updateUserStatus = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid status. Must be 'active', 'inactive', or 'suspended'" 
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    res.status(200).json({
      message: `User status updated to ${status}`,
      data: updatedUser,
      success: true
    });

  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({
      message: "Failed to update user status",
      error: error.message,
      success: false
    });
  }
});
