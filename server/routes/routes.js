import express from "express";
const router = express.Router();


import signUp from '../controller/user/signUp.js'
import signIn from '../controller/user/signIn.js'
import authtoken from "../middleware/auth.js";
import consultation from '../controller/services/consultation.js'
import doctorinfo from "../controller/user/doctorInfo.js";
import logout from '../controller/user/logOut.js'
import roomIdNotification from '../controller/notification/mail_roomId.js'
import sendContactUsEmail from "../controller/notification/mail_contactUs.js";
import upload from '../middleware/multer.js';
import { reviewDoctor } from '../controller/user/adminDashboard.js';
import isAdmin from '../middleware/isAdmin.js'; 
import { create } from "domain";

router.post('/signin', authtoken, signIn);
router.post('/signup', upload.single('document'), signUp);
router.post('/logout', logout);
router.post('/consultation', authtoken, consultation);
router.get('/doctorinfo', doctorinfo);
router.post('/notify-doctor', roomIdNotification);
router.post("/contact-us", sendContactUsEmail);
router.patch('/admin/review/:doctorId', reviewDoctor);
export default router;

