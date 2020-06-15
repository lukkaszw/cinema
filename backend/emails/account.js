const sgMail = require('./sendgrid');
const mainEmail = process.env.SENDGRID_API_EMAIL;

const afterCreate = (email) => {
  const msg = {
    to: `${email}`,
    from: `${mainEmail}`,
    subject: 'Thank you for joining to our website!',
    text: `You have added your account!`,
    html: `
    <div>
      <h3>Thank you for joining to our website!</h3>
      <br>
      <p>Please log in and complete your account details.</p>
      <br>
      <p>For more information call <strong style="color: red;">666 666 666</strong>.</p>
    </div>`,
  };

  sgMail.send(msg);
};

const afterUpdateAccount = (email) => {
  const msg = {
    to: `${email}`,
    from: `${mainEmail}`,
    subject: 'You have updated your account details!',
    text: `You have updated your account details!`,
    html: `
    <div>
      <h3>You have updated your account details!</h3>
      <br>
      <p>If it was not you, call <strong style="color: red;">666 666 666</strong>.</p>
    </div>`,
  }

  sgMail.send(msg);
}

const afterUpdatePassword = (email) => {
  const msg = {
    to: `${email}`,
    from: `${mainEmail}`,
    subject: 'You have updated your passowrd!',
    text: `You have updated your password!`,
    html: `
    <div>
      <h3>You have updated your password!</h3>
      <br>
      <p>If it was not you, call <strong style="color: red;">666 666 666</strong>.</p>
    </div>`,
  }

  sgMail.send(msg);
}

const afterDeleteAccount = (email) => {
  const msg = {
    to: `${email}`,
    from: `${mainEmail}`,
    subject: 'We are sorry that you deleted your account!',
    text:  'We are sorry that you deleted your account!',
    html: `
    <div>
      <h3> 'We are sorry that you deleted your account!'</h3>
    </div>`,
  };
  
  sgMail.send(msg);
}

module.exports = {
  afterCreate,
  afterUpdateAccount,
  afterUpdatePassword,
  afterDeleteAccount,
}