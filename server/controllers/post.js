//jshint esversion:6

const models = require("../models");

const Room = models.room;
const Customer = models.customer;

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
