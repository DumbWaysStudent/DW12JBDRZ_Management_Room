//jshint esversion:6

require("dotenv").config();

const express = require("express");
require("express-group-routes");

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const authController = require("./controllers/auth");

app.group("/api/v2", router => {
  router.post("/login", authController.login);
  router.post("/register", authController.register);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
