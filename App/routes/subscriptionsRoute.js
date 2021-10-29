const subscribe = require("../controller/subscriptionController");

const express = require("express");
const router = express.Router();
// subscriptions

exports.createProduct = router.post(
  "/create-subscription-product",
  subscribe.createProduct
);
exports.createPlans = router.post(
  "/create-subscription-Plans",
  subscribe.createPlan
);
exports.createsubscriber = router.post(
  "/user-subscription",
  subscribe.userSubscribe
);

// exports.createProduct = router.post(
//   "/cancel-subscription",
//   subscribe.
// );
// exports.createProduct = router.post(
//   "/upgrade-subscription",
//   subscribe.
// );

// end of subscription
