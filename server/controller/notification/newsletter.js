import subscriberModel from "../../models/user/subscriberSchema.js";


const subscribeController = async (req, res) => {
 
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    // Checking if already exists or not
    const existing = await subscriberModel.findOne({ email });
    if (existing) return res.json({success:true, message: "Already subscribed!" });

    await subscriberModel.create({ email });
    console.log("New subscriber:", email);

    res.json({success:true, message: "Thanks for subscribing!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({success:false, message: "Server error" });
  }
}

export default subscribeController;