//jshint esversion:6

const models = require("../models");

const Room = models.room;

const getRooms = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      name: item.name
    };
    return newItem;
  });
  return newData;
};

exports.showRooms = (req, res) => {
  Room.findAll({}).then(data => {
    res.send(getRooms(data));
  });
};
