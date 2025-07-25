import doctormodel from '../../models/user/doctorSchema.js';
import { asyncHandler } from "../../utils/asyncHandler.js"; // Corrected import

const doctorinfo = asyncHandler(async (req, res, next) => {
  // Fetch all doctors from the database. 
  // If this database query fails, asyncHandler will catch the error.
  const doctorData = await doctormodel.find({});

  // Send a success response to the client
  res.status(200).json({ success: true, data: doctorData });
});

export default doctorinfo;
