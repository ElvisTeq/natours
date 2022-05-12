/* eslint-disable */

// _________________________________________________________________________
// #12 - s10
// Creating email function

const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

// _________________________________________________________________________
// #8 - s13
// Building a Complex Email Handler

module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.firstName = user.name.split(' ')[0]),
      (this.url = url),
      (this.from = `Elvis Tek <${process.env.EMAIL_FROM}>`);
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return 1;
    }
    // Using nodemailer
    // => ********* data for Mailtrap *********
    return nodemailer.createTransport({
      //service: 'Gmail', // To use gmail service // Activate in gmail "less secure app" option
      host: process.env.EMAIL_HOST,
      post: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based in a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      // Second Argument => Data
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // 2) Email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
      // html:
    };

    // 3) Create a transport and send email
    // sendEmail => if not in Production mode
    await this.newTransport().sendEmail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Natours');
  }
};

// const sendEmail = async (options) => {
//   // 1) Create a transporter

//   // 2) Define the email options
//   const mailOptions = {
//     from: 'Elvis <hello@elvis.io>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html:
//   };

//   // 3) Actually Send email
//   // .sendMail(mailOptions) => assigning mailOptions to be ".sendMail" parameters
//   await transporter.sendMail(mailOptions);
// };
