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
    res.send(data);
  });
};
