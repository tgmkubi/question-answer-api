const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {

    // console.log(process.SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS);
    let transporter = nodemailer.createTransport({
        // service: 'Gmail',
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
    });

    let info = await transporter.sendMail(mailOptions);
    // console.log(`Message sent to: ${info.envelope.to}`);  
};

module.exports = sendEmail;