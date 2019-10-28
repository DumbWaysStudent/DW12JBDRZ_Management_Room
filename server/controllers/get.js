//jshint esversion:6

const models = require("../models");

const Room = models.room;
const Customer = models.customer;
const Order = models.order;

exports.showRooms = (req, res) => {
  Room.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] }
  }).then(data => {
    res.send(data);
  });
};

exports.showCustomers = (req, res) => {
  Customer.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] }
  }).then(data => {
    res.send(data);
  });
};

const getCheckin = data => {
  const newData = data.map(item => {
    const customer = item.customers.map(entry => {
	  const {id, name, identity_number, phone_number, image} = entry
      const newCustomer = {
        id,
        name,
        identity_number,
        phone_number,
        image,
      };
      return newCustomer;
    });
    const order = item.customers.map(entry => {
      const { id, is_booked, is_done, duration, order_end_time } = entry.order;
      const newOrder = {
        id,
        is_booked,
        is_done,
        duration,
        order_end_time
      };
      return newOrder;
    });
    const newItem = {
      id: item.id,
      name: item.name,
      customer: customer[0],
      order: order[0]
    };
    return newItem;
  });
  return newData;
};

exports.showCheckin = (req, res) => {
  Room.findAll({
    include: [
      {
        model: Customer,
        as: "customers",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: {
          model: Order,
          where: { is_done: false },
          attributes: { exclude: ["createdAt", "updatedAt"] }
        }
      }
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] }
  }).then(data => {
    res.send(getCheckin(data));
  });
};
