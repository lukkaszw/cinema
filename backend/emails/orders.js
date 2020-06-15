const sgMail = require('./sendgrid');
const getDate = require('../utils/getDate');

const mainEmail = process.env.SENDGRID_API_EMAIL;

const afterCreate = (order, show) => {
  const user = `${order.name} ${order.surname}`;
  const ticketsAmount = order.seats.length;
  const tickets = order.seats.join(', ');
  const date = `${getDate(show.day)} ${show.startAt}`;
  const title = show.movieId.title.toUpperCase();

  const msg = {
    to: `${order.email}`,
    from: `${mainEmail}`,
    subject: 'Thank you for your order!',
    text: `You have added your order!`,
    html: `
    <div>
      <h3>Mr./Mrs. ${user}, you have added your order!</3>
      <br>
      <p>Movie:  <strong style="color: #2ECC40;">${title}</strong></p>
      <p>Date:  <strong>${date}</strong></p>
      <br>
      <p>You have ordered <strong style="color: #0074D9;">${ticketsAmount} tickets!</strong></p>
      <p>Hall:  <strong>${show.hall}.</strong></p>
      <p>Your tickets:  <strong >${tickets}.</strong></p>
      <br>
      <p>Order price:  <strong style="color: #2ECC40;">${order.price}$</strong></p>
      <br>
      <p><strong style="color: red;">Please make the payment 30 min. before movie's show in cinema ticket office!</strong></p>
      <p>For more information or editing, canceling order please call: <strong style="color: orangered;">666 666 666</strong></p>
    </div>`,
  };

  sgMail.send(msg);
}

const afterEdit = (order) => {
  const user = `${order.name} ${order.surname}`;
  const ticketsAmount = order.seats.length;
  const tickets = order.seats.join(', ');
  const date = `${getDate(order.showId.day)} ${order.showId.startAt}`;
  const title = order.showId.movieId.title.toUpperCase();
  const hall = order.showId.hall;

  const msg = {
    to: `${order.email}`,
    from: `${mainEmail}`,
    subject: 'You have edited your order!',
    text: 'You have edited your order!',
    html: `<div>
      <p>Mr./Mrs. ${user}, you have edited your order from: </p>
      <p><strong style="color: #2ECC40;">${date}</strong></p>
      <p>Movie:  <strong style="color: #2ECC40;">${title}</strong></p>
      <br>
      <p>Order details after update: </p>
      <br>
      <p>You have ordered <strong style="color: #0074D9;">${ticketsAmount} tickets!</strong></p>
      <p>Hall:  <strong>${hall}.</strong></p>
      <p>Your tickets:  <strong >${tickets}.</strong></p>
      <br>
      <p>Order price:  <strong style="color: #2ECC40;">${order.price}$</strong></p>
      <br>
      <p>If it was not you, please call: <strong style="color: red;">666 666 666</strong>.</p>
    </div>`,
  };

  sgMail.send(msg);
}

const afterDelete = (order) => {
  const user = `${order.name} ${order.surname}`;
  const date = `${getDate(order.showId.day)} ${order.showId.startAt}`;
  const title = order.showId.movieId.title.toUpperCase();

  const msg = {
    to: `${order.email}`,
    from: `${mainEmail}`,
    subject: 'You have deleted your order!',
    text: 'You have deleted your order!',
    html:  `<div>
    <p>Mr./Mrs. ${user}, you have deleted your order from: </p>
    <br>
    <p><strong style="color: #2ECC40;">${date}</strong></p>
    <p>Movie:  <strong style="color: #2ECC40;">${title}</strong></p>
    <br>
    <p>You have deleted your order. If it was not you, please call: <strong style="color: red;">666 666 666</strong></p>
  </div>`,
  };

  sgMail.send(msg);
}

module.exports = {
  afterCreate,
  afterEdit,
  afterDelete,
}