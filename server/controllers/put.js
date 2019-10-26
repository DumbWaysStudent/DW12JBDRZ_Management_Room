//jshint esversion:6

const models = require("../models");

const Room = models.room;
const Customer = models.customer;
const Order = models.order;

exports.updateRoom = (req, res) => {
  const { room_id } = req.params;
  const { name } = req.body;

  Room.update(
    {
      name
    },
    {
      where: { id: room_id }
    }
  ).then(() => {
    Room.findOne({
      where: { id: room_id },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(data => {
      res.send(data);
    });
  });
};

exports.updateCustomer = (req, res) => {
  const { customer_id } = req.params;
  const { name, identity_number, phone_number, image } = req.body;

  Customer.update(
    {
      name,
      identity_number,
      phone_number,
      image
    },
    {
      where: { id: customer_id }
    }
  ).then(() => {
    Customer.findOne({
      where: { id: customer_id },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(data => {
      res.send(data);
    });
  });
};

const getCheckout = data => {
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

exports.updateCheckout = (req, res) => {
  const { order_id } = req.params;
  const {
    customer_id,
    room_id,
    is_booked,
    is_done,
    duration,
    order_end_time
  } = req.body;

  const time = new Date(order_end_time);

  Order.update(
    {
      customer_id,
      room_id,
      is_booked,
      is_done,
      duration,
      order_end_time: time
    },
    {
      where: { id: order_id }
    }
  ).then(() => {
    Order.findOne({
      where: { id: order_id },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }).then(data => {
      res.send(getCheckout(data));
    });
  });
};
