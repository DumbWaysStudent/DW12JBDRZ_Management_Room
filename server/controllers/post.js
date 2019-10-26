//jshint esversion:6

const models = require("../models");

const Room = models.room;
const Customer = models.customer;
const Order = models.order;

const getRoom = data => {
  const newData = {
    id: data.id,
    name: data.name
  };
  return newData;
};

exports.storeRoom = (req, res) => {
  const { name } = req.body;

  Room.create({ name }).then(data => {
    res.send(getRoom(data));
  });
};

const getCustomer = data => {
  const newData = {
    id: data.id,
    name: data.name,
    identity_number: data.identity_number,
    phone_number: data.phone_number,
    image: data.image
  };
  return newData;
};

exports.storeCustomer = (req, res) => {
  const { name, identity_number, phone_number, image } = req.body;

  Customer.create({
    name,
    identity_number,
    phone_number,
    image
  }).then(data => {
    res.send(getCustomer(data));
  });
};

const getCheckin = data => {
  const newData = {
    id: data.id,
    customer_id: data.customer_id,
    room_id: data.room_id,
    is_booked: data.is_booked,
    is_done: data.is_done,
    duration: data.duration,
    order_end_time: data.order_end_time
  };
  return newData;
};

exports.storeCheckin = (req, res) => {
  const {
    customer_id,
    room_id,
    is_booked,
    is_done,
    duration,
    order_end_time
  } = req.body;

  const time = new Date(order_end_time);

  Order.findOne({
    where: { room_id, is_booked, is_done }
  }).then(item => {
    if (item) {
      res
        .status(400)
        .json({ message: "Room already booked by another customer" });
    } else {
      Order.create({
        customer_id,
        room_id,
        is_booked,
        is_done,
        duration,
        order_end_time: time
      }).then(data => {
        res.send(getCheckin(data));
      });
    }
  });
};
