const express = require("express");
const router = express.Router();
const createOrder = require("../controller/PaymentController");

exports.processBuyerOrder = router
  .post("/create-order", createOrder.createOrders)
  .subscribe(val => {
    console.log(val);
    return val;
  });
