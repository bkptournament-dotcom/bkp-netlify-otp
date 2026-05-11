const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Sirf GET request allow karein
  const email = event.queryStringParameters.email;
  const otp = event.queryStringParameters.otp;

  if (!email || !otp) {
    return { statusCode: 400, body: "Missing Email or OTP" };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bkptournament@gmail.com',
      pass: 'aglo dmyb jgew ygkv' // Aapka App Password
    }
  });

  try {
    await transporter.sendMail({
      from: '"BKP ESPORTS" <bkptournament@gmail.com>',
      to: email,
      subject: "OTP: " + otp,
      text: "Aapka OTP code hai: " + otp,
      html: `<b>Namaste!</b><br>Aapka OTP code hai: <h1>${otp}</h1>`
    });

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Email Sent Successfully"
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
