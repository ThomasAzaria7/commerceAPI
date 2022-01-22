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
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
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

/**
 // function is for sending recipt to email of customer 
 **/
exports.sendRecipt = (req, res, next) => {
  const mailOptions = req.body.recipt_data;
  console.log(req.body.current_SEller_email);
  let sellerEmail = req.body.current_SEller_email;
  const items = mailOptions.items;
  const paypalFee = req.body.processingFee;
  // console.log("my recipt dataa", req.body);
  console.log("my paypal fee", paypalFee);
  // items_data;

  payments = {
    total: 0,
    papaltranactionFee: paypalFee
  };

  for (let i = 0; i < items.length; i++) {
    payments.total += parseFloat(items[i].unit_amount.value);
  }
  payments.total = payments.total.toFixed(2);

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
        from: '"Aseyea MarketPlace" testmail@zoho.com',
        to: sellerEmail,
        subject: "recipt",
        html: data
      };
      // console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("seller recipt email Message sent: " + info.response);
        }
      });
    }
  });

  return res.json();
};

/// create buyer recipt

exports.buyerRecipt = (req, res, next) => {
  const mailOptions = req.body.recipt_data; // retrieve complete recipt data
  const items = mailOptions.purchase_units[0].items; // retreieve recipt items from recipt data
  const email_address = mailOptions.payer.email_address; // email address retireved from paypal.

  payments = { total: 0 }; // use object to store total cost
  // loop to get total cost of items
  for (let i = 0; i < items.length; i++) {
    payments.total += parseFloat(items[i].unit_amount.value);
  }
  payments.total = payments.total.toFixed(2);

  var filePath = "./App/views/buyerRecipt.ejs"; // specifify file path for file to be rendered in the email.
  var resolvedPath = path.resolve(filePath);

  ejs.renderFile(resolvedPath, { data: mailOptions, money: payments }, function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      var mainOptions = {
        from: '"Aseyea MarketPlace" testmail@zoho.com',
        to: "yungblackhumbl3@gmail.com", // change this field to be dynamic
        subject: "recipt",
        html: data
      };
      // console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(" buyer emial Message sent: " + info.response);
        }
      });
    }
  });

  return res.json();
};
// end of buyer recipt

exports.welcomeMail = (req, res, next) => {
  const UserEmail = req.body.email;

  var filePath = "./App/views/welcomeEmail.ejs";
  var resolvedPath = path.resolve(filePath);

  ejs.renderFile(resolvedPath, { data: UserEmail }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var mainOptions = {
        from: "Aseyea online marketplace",
        to: UserEmail,
        subject: "welcome to Aseyea online marketplace",
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

exports.subscribeMailNotice = (req, res, next) => {
  const mailOptions = req.body;

  var filePath = "./App/views/subscriptionEmail.ejs";
  var resolvedPath = path.resolve(filePath);

  ejs.renderFile(resolvedPath, { data: mailOptions.data }, function(err, data) {
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

exports.productShipped = (req, res, next) => {
  const mailOptions = req.body;

  var filePath = "./App/views/itemShipped.ejs";
  var resolvedPath = path.resolve(filePath);

  ejs.renderFile(resolvedPath, { data: mailOptions.data }, function(err, data) {
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

// exports.newsLetters = (req, res, next) => {
//   const mailOptions = req.body;

//   var send = transporter.templateSender(
//     new EmailTemplate("template/directory")
//   );

//   transporter.sendMail(mailOptions, function(err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//       res.send(info);
//     }
//   });
// };
