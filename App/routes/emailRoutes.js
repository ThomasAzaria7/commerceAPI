const express = require("express");
const router = express.Router();

const mailController = require("../controller/emailsController");

exports.recipt = router.post("/send-recipt", mailController.sendRecipt);

exports.welcome = router
  .post("/welcome", mailController.welcomeMail)
  .subscribe(val => {
    console.log(val);
    return val;
  });
//  /
exports.signup = router
  .post("/register", mailController.signupMail)
  .subscribe(val => {
    console.log(val);
    return val;
  });

exports.subscribe = router
  .post("/subscribe", mailController.subscribeMailNotice)
  .subscribe(val => {
    console.log(val);
    return val;
  });
exports.newsletters = router
  .post("/weeklyletters", mailController.newsLetters)
  .subscribe(val => {
    console.log(val);
    return val;
  });
