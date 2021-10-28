const express = require("express");
const router = express.Router();
const createOrder = require("../controller/PaymentController");

exports.processBuyerOrder = router.post(
  "/create-order",
  createOrder.createOrders
);
// .subscribe(val => {
//   // console.log(val);
//   console.log("hi");
//   return val;
// });

exports.getAccessToken = router.post("/token", createOrder.getToken);

exports.captureBuyerOrder = router.post(
  "/capture-order/:id",
  createOrder.captureOrder
);
// .subscribe(val => {
//   console.log(val);
//   return val;
// });
