const express = require("express");
const router = express.Router();
const subscriptionControls = require("../controller/subscriptionController");

exports.createProduct = router.post(
  "/createSubscribeProduct",
  subscriptionControls.createProduct
);
