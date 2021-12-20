const express = require("express");
const router = express.Router();

const mailController = require("../controller/emailsController");

exports.recipt = router.post("/send-recipt", mailController.sendRecipt); // sending recipt to merchants
exports.myRecipt = router.post("/buyer-recipt", mailController.buyerRecipt); // sending recipt to merchants

exports.welcome = router.post("/register-welcome", mailController.welcomeMail); // sending a thanks for registering email

exports.subscribe = router.post(
  "/subscribe-notice",
  mailController.subscribeMailNotice
); // sending subscribed notice email

exports.itemShipped = router.post(
  "/item-shipped",
  mailController.productShipped
); // sending recipt to buyer.
// exports.signup = router.post("/buyer-recipts", mailController.); // sending recipt to buyer.
// exports.newsletters = router
//   .post("/weeklyletters", mailController.newsLetters)
//   .subscribe(val => {
//     console.log(val);
//     return val;
//   });
