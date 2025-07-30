import { asyncHandler } from "../../utils/asyncHandler.js";

const consultation = asyncHandler(async (req, res, next) => {
    console.log('Consultation service called');
    res.status(200).json({
        message: "Consultation service is working"
    });
});

export default consultation;