import User from "../config/models/user.js";
import Otp from "../config/models/otp.js";
import {
  formatUserProfile,
  generateOtp,
  generateToken,
  sendResult,
} from "../utils/index.js";
import { sendOtpSMS } from "../services/twilio.js";

// Create user
export const signup = async (req, res) => {
  try {
    const { name, email, mobileNumber, currency, role } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (existingUser) {
      return sendResult(res, false, 400, "Email or Mobile already registered");
    }

    const newUser = await User.create({
      name,
      email,
      mobileNumber,
      currency,
      role: role || "user",
      isOtpVerified: false,
    });

    const token = generateToken(newUser._id);

    return sendResult(
      res,
      true,
      200,
      "User registered successfully",
      formatUserProfile(newUser, token)
    );
  } catch (error) {
    console.error("Signup error:", error);
    return sendResult(res, false, 500, "Internal Server error", error);
  }
};

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { mobileNumber, mode } = req.body;

    const formattedNumber = mobileNumber.startsWith("+91")
      ? mobileNumber
      : `+91${mobileNumber}`;

  const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found. Please signup first." });
    }

    const otp = generateOtp();
    // const otp = "1234"; // local development

    await Otp.deleteMany({ mobileNumber });
    await Otp.create({ mobileNumber, otp });

    // twilio sms
    const sent = await sendOtpSMS(formattedNumber, otp);

    if (!sent) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to send OTP" });
    }

    return sendResult(res, true, 200, "OTP sent successfully", {
      id: user._id,
      isOtpVerified: user.isOtpVerified,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return sendResult(res, false, 500, "Server error");
  }
};

// Verify OTP & login
export const verifyOtp = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    const existingOtp = await Otp.findOne({ mobileNumber, otp });
    if (!existingOtp) {
      return sendResult(res, false, 400, "Invalid or expired OTP");
    }

    await Otp.deleteMany({ mobileNumber });

    const user = await User.findOneAndUpdate(
      { mobileNumber },
      { isOtpVerified: true },
      { new: true }
    );

    const token = generateToken(user._id);

    return sendResult(
      res,
      true,
      200,
      "Login successful",
      formatUserProfile(user, token)
    );
  } catch (error) {
    console.error("Verify OTP error:", error);
    return sendResult(res, false, 500, "Server error");
  }
};

export const logout = async (req, res) => {
  try {
    return sendResult(res, true, 200, "Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
    return sendResult(res, false, 500, "Server error");
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, mobileNumber, currency } = req.body;

    // Match field names correctly with your schema
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, mobileNumber, currency }, // use "mobileNumber" if schema has that
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return sendResult(res, true, 200, "User Updated Successfully", updatedUser);
  } catch (err) {
    console.error("Update error:", err.message);
    return sendResult(res, false, 500, "Server error");
  }
};
