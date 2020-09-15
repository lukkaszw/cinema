const Order = require('../models/order');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const Show = require('../models/show');
const sendOrderEmail = require('../emails/orders');

const addOrder = async (req, res) => {
  const orderData = req.body;

  try {
    const takenOrders = await Order.find({showId: ObjectId(orderData.showId), seats: { $in: orderData.seats }});

    if(takenOrders.length > 0) {
      throw Error('Those Seats are taken!');
    }

    //RODO - need to change personal data from form 
    orderData.name = 'Addedname';
    orderData.surname = 'Addedsurname';
    orderData.phone = '111111111';
    orderData.email = 'added_email@gmail.com';

    const order = new Order(orderData);
    if(req.userId) {
      order.userId = req.userId;
      const user = await User.findById(req.userId);
      user.orders.push(order._id);
      await user.save();
    }
    await order.save();

    const orders = await Order.find({ showId: ObjectId(orderData.showId)})
      .select('seats');
    let seats = [];
    orders.forEach(order => {
      seats = seats.concat(order.seats);
    });

    req.io.to(orderData.showId).emit('loadSeats', seats);

    const show = await Show.findById(order.showId)
      .populate('movieId');

    res.json();
    
    sendOrderEmail.afterCreate(order, show);
  } catch (error) {
    res.status(400).json(error);
  }
}

const deleteOrder = async (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  try {
    const order = await Order.findOne({ _id, userId }).populate({
      path: 'showId',
      populate: {
        path: 'movieId',
        options: { select: 'title'}
      }
    });

    if(!order) {
      res.status(404).json({
        isError: true,
        message: 'Order not found!'
      });
      return;
    }
    await order.remove();

    const orders = await Order.find({ showId: ObjectId(order.showId._id)})
      .select('seats');
    let seats = [];
    orders.forEach(order => {
      seats = seats.concat(order.seats);
    });

    req.io.to(order.showId._id).emit('loadSeats', seats);

    res.json(order._id);

    sendOrderEmail.afterDelete(order);

  } catch (error) {
    res.status(500).json(error);
  }
}

const editOrder = async (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  const data = req.body;
  const allowed = ['name', 'surname', 'phone', 'price', 'email', 'seats'];
  const changes = Object.keys(data);
  const isMatch = changes.every(key => allowed.includes(key));

  if(!isMatch) {
    res.status(400).json({
      isError: true,
      mesage: 'Bad request!',
    });
    return;
  }

  try {

    const order = await Order.findOne({ _id, userId }).populate({
      path: 'showId',
      populate: {
        path: 'movieId',
        options: { select: 'title'}
      }
    });

    if(!order) {
      res.status(404).json({
        isError: true,
        message: 'Order not found!'
      });
      return;
    }

    const takenOrders = await Order.find({
      showId: ObjectId(order.showId._id),
      seats: { $in: data.seats },
    });

    const othersTakenThanEdited = takenOrders.filter(takenOrder => takenOrder._id.toString() !== order._id.toString());

    if(othersTakenThanEdited.length > 0) {
      throw Error('Seats are taken by another users!');
    }

    const seatsBeforeUpdate = [...order.seats];

    //RODO - need to change personal data from form 
    data.name = 'Editedname';
    data.surname = 'Editedsurname';
    data.phone = '222222222';
    data.email = 'edited_email@gmail.com';

    changes.forEach(key => {
      order[key] = data[key];
    });

    await order.save();

    res.json(order);

    sendOrderEmail.afterEdit(order);

    if(JSON.stringify(data.seats) !== JSON.stringify(seatsBeforeUpdate)) {
      const orders = await Order.find({ showId: ObjectId(order.showId._id)})
        .select('seats');
      let seats = [];
      orders.forEach(order => {
        seats = seats.concat(order.seats);
      });

      req.io.to(order.showId._id).emit('loadSeats', seats);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const getSeats = async (req, res) => {
  const showId = req.params.showId;
  try {
    const orders = await Order.find({ showId: ObjectId(showId)})
      .select('-surname -name -phone -email -showId -status');

    let seats = [];
    orders.forEach(order => {
      seats = seats.concat(order.seats);
    });

    res.json(seats);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getSeats,
  addOrder,
  editOrder,
  deleteOrder,
};