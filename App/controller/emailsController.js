const nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
const path = require("path");
const express = require("express");
const app = express();
// var ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", "views");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thomas.azaria7@gmail.com",
    pass: "ignwfytnhsjbncww"
  }
});

const ejs = require("ejs");

//attach the plugin to the nodemailer transporter
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".ejs",
      partialsDir: "./views",
      layoutsDir: "./views",
      // layoutsDir: '/views',
      defaultLayout: ""
    },
    viewPath: "./views",
    extName: ".ejs"
  })
);
//send mail with options

// function is for sending recipt to email of customer
exports.sendRecipt = (req, res, next) => {
  const mailOptions = req.body;
  const items = mailOptions.items;
  //   console.log("my recipt dataa", req.body);

  payments = {
    total: 0,
    papaltranactionFee: 2.7 / 100 + 0.3
  };

  for (let i = 0; i < items.length; i++) {
    console.log("user" + i, items);

    payments.total += parseFloat(items[i].unit_amount.value);

    payments.papaltranactionFee = (payments.total * 0.027 + 0.3).toFixed(2);
    console.log(payments.papaltranactionFee);
  }

  //   const Customeremail = mailOptions.data.data.payer.email_address;

  var filePath = "./App/views/recipt.ejs";
  var resolvedPath = path.resolve(filePath);

  ejs.renderFile(resolvedPath, { data: mailOptions, money: payments }, function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      //   console.log(mailOptions.data);

      var mainOptions = {
        from: '"HobbyJockey" testmail@zoho.com',
        to: "yungblackhumbl3@gmail.com",
        subject: "Hello, world",
        html: data
      };
      // console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: " + info.response);
        }
      });
    }
  });

  return res.json();
};

exports.welcomeMail = (req, res, next) => {
  const mailOptions = req.body;

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.send(info);
    }
  });
};

exports.signupMail = (req, res, next) => {
  const mailOptions = req.body;

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.send(info);
    }
  });
};

exports.subscribeMailNotice = (req, res, next) => {
  const mailOptions = req.body;

  var filePath = "./views/recipt.ejs";
  var resolvedPath = path.resolve(filePath);

  ejs.renderFile(resolvedPath, { name: mailOptions.data }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var mainOptions = {
        from: '"HobbyJockey" testmail@zoho.com',
        to: "yungblackhumbl3@gmail.com",
        subject: "Hello, world",
        html: data
      };
      // console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: " + info.response);
        }
      });
    }
  });
};

exports.newsLetters = (req, res, next) => {
  const mailOptions = req.body;

  var send = transporter.templateSender(
    new EmailTemplate("template/directory")
  );

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.send(info);
    }
  });
};
