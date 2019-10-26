//jshint esversion:6

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const models = require("../models");
const User = models.user;

exports.login = (req, res) => {
  User.findOne({
    where: { username: req.body.username }
  }).then(user => {
    if (user) {
      const authorize = bcrypt.compareSync(req.body.password, user.password);

      if (authorize) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        res.send({
          id: user.id,
          token
        });
      } else {
        res.status(401).send({
          message: `Incorrect password`
        });
      }
    } else {
      res.status(401).send({
        message: `Unregistered email`
      });
    }
  });
};
