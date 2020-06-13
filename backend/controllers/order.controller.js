const Order = require('../models/order');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

const addOrder = async (req, res) => {
  const orderData = req.body;
  try {
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

    res.json();
  } catch (error) {
    res.status(400).json(error);
  }
}

const deleteOrder = async (req, res) => {
  const _id = req.params.id;
  const userId = req.userId;
  try {
    const order = await Order.findOne({ _id, userId });
    if(!order) {
      res.status(404).json({
        isError: true,
        message: 'Order not found!'
      });
      return;
    }
    await order.remove();

    const orders = await Order.find({ showId: ObjectId(order.showId)})
      .select('seats');
    let seats = [];
    orders.forEach(order => {
      seats = seats.concat(order.seats);
    });

    req.io.to(order.showId).emit('loadSeats', seats);

    res.json(order._id);
  } catch (error) {
    res.status(500).json(error);
  }
}

const editOrder = async (req, res) => {
  const _id = req.params.id;
  const userId = req.userId;

  const data = req.body;
  const allowed = ['name', 'surname', 'phone', 'email', 'seats'];
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

    const seatsBeforeUpdate = [...order.seats];

    if(!order) {
      res.status(404).json({
        isError: true,
        message: 'Order not found!'
      });
      return;
    }

    changes.forEach(key => {
      order[key] = data[key];
    });

    await order.save();

    res.json(order);
    if(JSON.stringify(data.seats) !== JSON.stringify(seatsBeforeUpdate)) {
      console.log('we are here');
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