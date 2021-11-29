const express = require("express");
const router = express.Router();
const createOrder = require("../controller/PaymentController");
const completeProduct = require("../controller/productsCompleted");
const clientPayout = require("../controller/paymentDistribution");

exports.processBuyerOrder = router.post(
  "/create-order",
  createOrder.createOrders
);

exports.getAccessToken = router.post("/token", createOrder.getToken);

exports.captureBuyerOrder = router.post(
  "/capture-order/:id",
  createOrder.captureOrder
);

// get recipt route
exports.getOrders = router.get(
  "/product/:id",
  completeProduct.getCompletedProducts
);

//payouts
exports.payout = router.post("/pay-clients", clientPayout.sendPayment);

exports.payoutConfirmation = router.get(
  "/confirm-payout",
  clientPayout.getPayoutConfirmation
);
