import doctormodel from '../../models/user/doctorSchema.js';
import userModel from '../../models/user/user.js';
import bcrypt from 'bcryptjs';


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
