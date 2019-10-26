//jshint esversion:6

const models = require("../models");

const Room = models.room;
const Customer = models.customer;

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
