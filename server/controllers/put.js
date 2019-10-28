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
  ).then(data => {
    if (data) {
      Room.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }).then(item => {
        res.send(item);
      });
    } else {
      res.status(400).json({ message: "No room was edited" });
    }
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
  ).then(data => {
    if (data) {
      Customer.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }).then(item => {
        res.send(item);
      });
    } else {
      res.status(400).json({ message: "No customer was edited" });
    }
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

  Order.findOne({
    where: {
      id: order_id,
      customer_id,
      room_id,
      is_booked: true,
      is_done: false
    }
  }).then(item => {
    if (item) {
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
    } else {
      res.status(400).json({
        message: "No one book this room."
      });
    }
  });
};
