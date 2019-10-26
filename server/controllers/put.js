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
      where: { id: room_id }
    }).then(data => {
      res.send(getRoom(data));
    });
  });
};
