const nodemailer = require("nodemailer");

function createTransport({ smtpHost, smtpPort, smtpUser, smtpPass }) {
  if (smtpHost && smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });
  }

  // Safe simulation transport: does not send real emails
  return nodemailer.createTransport({ jsonTransport: true });
}

async function sendMail(transport, { from, to, subject, text }) {
  return transport.sendMail({ from, to, subject, text });
}

module.exports = { createTransport, sendMail };

