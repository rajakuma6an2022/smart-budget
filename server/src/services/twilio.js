import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendOtpSMS = async (mobileNumber, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp} for Smart Budget App. Do not share it.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNumber, // e.g. +919876543210
    });
    console.log("SMS sent:", message.sid);
    return true;
  } catch (error) {
    console.error("Twilio SMS error:", error);
    return false;
  }
};
