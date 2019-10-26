//jshint esversion:6

const models = require("../models");

const Room = models.room;

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
