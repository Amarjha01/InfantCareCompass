import express from "express";
const router = express.Router();

import signUp from '../controller/user/signUp.js';
import signIn from '../controller/user/signIn.js';
import authtoken from "../middleware/auth.js";
import consultation from '../controller/services/consultation.js';
import doctorinfo from "../controller/user/doctorInfo.js";
import logout from '../controller/user/logOut.js';
import roomIdNotification from '../controller/notification/mail_roomId.js';
import sendContactUsEmail from "../controller/notification/mail_contactUs.js";
import upload from '../middleware/multer.js';
import { reviewDoctor } from '../controller/user/adminDashboard.js';
import isAdmin from '../middleware/isAdmin.js'; 
import { create } from "domain";

router.post('/signup', upload.single('document'), signUp);

import {
  createFeedLog,
  getFeedLogs,
  updateFeedLog,
  deleteFeedLog,
  createSleepLog,
  getSleepLogs,
  updateSleepLog,
  deleteSleepLog,
} from '../controller/feedLog.js';

import { careCoPilot, healthCheck } from '../controller/services/careCoPilot.js';
import githubCallback from "../controller/user/githubCallback.js";
import githubLoginRedirect from "../controller/user/githubLoginRedirect.js";

import {
  createGrowthLog,
  getGrowthLogs,
  getGrowthLogById,
  updateGrowthLog,
  deleteGrowthLog,
  updateReminderSettings,
  getGrowthStats
} from '../controller/growthTracker.js';

// Auth routes
router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/logout', logout);

// Doctor and consultation
router.post('/consultation', authtoken, consultation);
router.get('/doctorinfo', doctorinfo);

// Notifications
router.post('/notify-doctor', roomIdNotification);
router.post("/contact-us", sendContactUsEmail);
router.patch('/admin/review/:doctorId', reviewDoctor);


// FeedLog routes
router.post('/feedlogs', authtoken, createFeedLog);
router.get('/feedlogs', authtoken, getFeedLogs);
router.put('/feedlogs/:id', authtoken, updateFeedLog);
router.delete('/feedlogs/:id', authtoken, deleteFeedLog);

// SleepLog routes
router.post('/sleeplogs', authtoken, createSleepLog);
router.get('/sleeplogs', authtoken, getSleepLogs);
router.put('/sleeplogs/:id', authtoken, updateSleepLog);
router.delete('/sleeplogs/:id', authtoken, deleteSleepLog);

// Care Co-Pilot AI Medicine Finder routes
router.post('/care-co-pilot', careCoPilot);
router.get('/care-co-pilot/health', healthCheck);

// Growth Tracker routes
router.post('/growth-logs', authtoken, createGrowthLog);
router.get('/growth-logs', authtoken, getGrowthLogs);
router.get('/growth-logs/:id', authtoken, getGrowthLogById);
router.put('/growth-logs/:id', authtoken, updateGrowthLog);
router.delete('/growth-logs/:id', authtoken, deleteGrowthLog);
router.patch('/growth-logs/reminder-settings', authtoken, updateReminderSettings);
router.get('/growth-logs/stats', authtoken, getGrowthStats);

//Github oauth routes
router.get('/auth/github/callback', githubCallback)
router.get('/auth/github', githubLoginRedirect)

export default router;

