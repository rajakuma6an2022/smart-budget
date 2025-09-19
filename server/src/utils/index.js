import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecretkey";
const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || "supersecretkey";

// Generate JWT Token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

// Verify JWT Token
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// Encrypt response data
export const encryptResponse = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt response data (useful for testing in backend, frontend will use same logic)
export const decryptResponse = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Helper to format API response
export const sendResult = (res, success, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success,        // boolean: true/false
    statusCode,     // numeric HTTP status
    message,        // string
    data: data || null
  });
};


// generate random 4-digit OTP
export const generateOtp = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

// userprofile format
export const formatUserProfile = (user, token) => ({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    currency: user.currency,
    role: user.role,
    isOtpVerified: user.isOtpVerified,
    createdAt: user.createdAt,
    token,
  },
});
