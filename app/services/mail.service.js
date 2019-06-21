// npm
const nodemailer = require('nodemailer');
require('dotenv').config();

const {
  MAIL_ADDRESS_SMTP,
  MAIL_PASSWORD_SMTP,
  MAIL_ADDRESS_TO
} = process.env;

function send (req, cb) {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${MAIL_ADDRESS_SMTP}`,
      pass: `${MAIL_PASSWORD_SMTP}`
    }
  });

  const mailOptions = {
    from: email,
    to: `${MAIL_ADDRESS_TO}`,
    subject: 'itHobbies message',
    html:`
      <p>${name}</p>
      <p>${email}</p>
      <p>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      cb('error');
    }
    else {
      console.log(info);
      cb('success');
    }
  })
}


module.exports = {
  send
};