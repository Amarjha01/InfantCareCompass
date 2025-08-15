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

router.post('/signin', authtoken, signIn);
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

export default router;

