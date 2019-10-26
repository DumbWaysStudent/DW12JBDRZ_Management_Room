//jshint esversion:6

const models = require("../models");

const Room = models.room;

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
