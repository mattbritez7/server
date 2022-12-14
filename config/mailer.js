const nodemailer = require('nodemailer')

function transporter() { 
  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'proyectofinalhenryg2@gmail.com',
      pass: 'qvszyokncaknfcoc'
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  transporter.verify().then(() => {
    console.log('ready to send emails')
  })
}

module.exports = transporter;
