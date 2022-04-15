// _________________________________________________________________________
// #12 - s10
// Creating email function

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  // => ********* data from Mailtrap *********
  const transporter = nodemailer.createTransport({
    //service: 'Gmail', // To use gmail service // Activate in gmail "less secure app" option
    host: process.env.EMAIL_HOST,
    post: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Elvis <hello@elvis.io>',
    // parameters when calling "sendEmail({options})"
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually Send email
  // .sendMail(mailOptions) => assigning mailOptions to be ".sendMail" parameters
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
