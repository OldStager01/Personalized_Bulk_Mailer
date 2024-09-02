const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = async (to, subject, messageContent) => {
  const tranporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  try {
    const message = {
      to,
      subject,
      html: messageContent,
    };
    //!Send mail
    const info = await tranporter.sendMail(message);
    console.log(`Email sent to ${to} successfully`);
  } catch (err) {
    console.log(`Error sending Email to ${to}`);
    throw new Error(err);
  }
};

module.exports = sendEmail;
