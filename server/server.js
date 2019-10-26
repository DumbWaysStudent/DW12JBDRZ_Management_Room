//jshint esversion:6

require("dotenv").config();

const express = require("express");
require("express-group-routes");

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const authController = require("./controllers/auth");
const getController = require("./controllers/get");
const postController = require("./controllers/post");
const putController = require("./controllers/put");

const { authenticated, authorized } = require("./middleware");

app.group("/api/v2", router => {
  router.post("/login", authController.login);
  router.post("/register", authController.register);

  router.get(
    "/user/:user_id/rooms",
    authenticated,
    authorized,
    getController.showRooms
  );

  router.post(
    "/user/:user_id/room",
    authenticated,
    authorized,
    postController.storeRoom
  );

  router.put(
    "/user/:user_id/room/:room_id",
    authenticated,
    authorized,
    putController.updateRoom
  );
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorized." });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));