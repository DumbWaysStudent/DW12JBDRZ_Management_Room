"use strict";
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "room",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};
