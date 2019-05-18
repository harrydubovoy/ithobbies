// npm
const nodemailer = require('nodemailer');
require('dotenv').config();

async function send (req, res) {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.MAIL_ADDRESS_SMTP}`,
            pass: `${process.env.MAIL_PASSWORD_SMTP}`
        }
    });

    const mailOptions = {
        from: email,
        to: `${process.env.MAIL_ADDRESS_TO}`,
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
            res.send('error')
        }
        else {
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
}


module.exports = {
    send
};