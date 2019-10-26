//jshint esversion:6

const models = require("../models");

const Room = models.room;
const Customer = models.customer;

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
