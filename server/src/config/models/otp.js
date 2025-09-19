import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 min
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
