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

// Appointment controller imports
import {
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  deleteAppointment,
  getAvailableTimeSlots
} from '../controller/appointmentController.js';

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

// Appointment routes
router.post('/appointments', authtoken, createAppointment);
router.get('/appointments/user/:patientId', authtoken, getUserAppointments);
router.get('/appointments/doctor/:doctorId', authtoken, getDoctorAppointments);
router.patch('/appointments/:appointmentId/status', authtoken, updateAppointmentStatus);
router.patch('/appointments/:appointmentId/cancel', authtoken, cancelAppointment);
router.delete('/appointments/:appointmentId', authtoken, isAdmin, deleteAppointment);
router.get('/appointments/available-slots', getAvailableTimeSlots);

//Github oauth routes
router.get('/auth/github/callback', githubCallback)
router.get('/auth/github', githubLoginRedirect)

export default router;

