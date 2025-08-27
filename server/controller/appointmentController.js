import Appointment from "../models/Appointment.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create new appointment
export const createAppointment = asyncHandler(async (req, res) => {
  const { patientId, doctorId, appointmentDate, appointmentTime, appointmentType, notes } = req.body;

  // Check if the time slot is available
  const existingAppointment = await Appointment.findOne({
    doctorId,
    appointmentDate,
    appointmentTime,
    status: { $nin: ["cancelled"] }
  });

  if (existingAppointment) {
    return res.status(400).json({
      success: false,
      message: "This time slot is already booked. Please choose another time."
    });
  }

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    appointmentDate,
    appointmentTime,
    appointmentType,
    notes
  });

  res.status(201).json({
    success: true,
    message: "Appointment booked successfully",
    data: appointment
  });
});

// Get all appointments for a user (patient)
export const getUserAppointments = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const appointments = await Appointment.find({ patientId })
    .populate("doctorId", "name specialty")
    .sort({ appointmentDate: 1, appointmentTime: 1 });

  res.status(200).json({
    success: true,
    data: appointments
  });
});

// Get all appointments for a doctor
export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  let query = { doctorId };
  
  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    query.appointmentDate = {
      $gte: startOfDay,
      $lte: endOfDay
    };
  }

  const appointments = await Appointment.find(query)
    .populate("patientId", "name email")
    .sort({ appointmentDate: 1, appointmentTime: 1 });

  res.status(200).json({
    success: true,
    data: appointments
  });
});

// Update appointment status
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { status, notes } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status, notes, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Appointment status updated successfully",
    data: appointment
  });
});

// Cancel appointment
export const cancelAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status: "cancelled", updatedAt: Date.now() },
    { new: true }
  );

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Appointment cancelled successfully",
    data: appointment
  });
});

// Delete appointment (admin only)
export const deleteAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  const appointment = await Appointment.findByIdAndDelete(appointmentId);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Appointment deleted successfully"
  });
});

// Get available time slots for a specific date and doctor
export const getAvailableTimeSlots = asyncHandler(async (req, res) => {
  const { doctorId, date } = req.query;

  if (!doctorId || !date) {
    return res.status(400).json({
      success: false,
      message: "Doctor ID and date are required"
    });
  }

  const allTimeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  // Get booked time slots for the specific date and doctor
  const bookedAppointments = await Appointment.find({
    doctorId,
    appointmentDate: date,
    status: { $nin: ["cancelled"] }
  });

  const bookedTimeSlots = bookedAppointments.map(appointment => appointment.appointmentTime);

  // Filter out booked time slots
  const availableTimeSlots = allTimeSlots.filter(timeSlot => 
    !bookedTimeSlots.includes(timeSlot)
  );

  res.status(200).json({
    success: true,
    data: {
      date,
      doctorId,
      availableTimeSlots,
      bookedTimeSlots
    }
  });
});
