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
      // Using => SendGrid with Nodemailer
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
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
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  // "welcome.pug"
  async sendWelcome() {
    await this.send('welcome', 'Welcome to Natours');
  }
  // "passwordReset.pug"
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for 10 minutes)'
    );
  }
};
