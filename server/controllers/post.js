//jshint esversion:6

const models = require("../models");

const Room = models.room;

exports.storeRoom = (req, res) => {
  const { name } = req.body;

  Room.create({ name }).then(data => {
    res.send(data);
  });
};
