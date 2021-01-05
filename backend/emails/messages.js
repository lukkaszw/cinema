const sgMail = require('./sendgrid');

const sendEmail = ({ name, email, message, ownEmail }) => {
  const msg = {
    to: ownEmail,
    from: email,
    subject: `Main z portfolio od ${name} (${email})`,
    text: `Main z portfolio od ${name} (${email})`,
    html:  `<div>
    <p>${message}</p>
  </div>`,
  };
  return sgMail.send(msg);
}

module.exports = {
  sendEmail,
};