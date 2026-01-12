import OtpStore from "../models/OtpStore.js";
import nodemailer from "nodemailer";

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOtp();

    // Save OTP in DB
    await OtpStore.create({ email, otp });

    // Send OTP to email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Productr" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP is: ${otp}`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};


// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await OtpStore.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error verifying OTP" });
  }
};
