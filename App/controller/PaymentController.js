// const express = require("express");
// const app = express();
// var ejs = require("
var request = require("request");
let token = null;

exports.getToken = (req, res, next) => {
  console.log(process.env.CLIENT_ID);
  request.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "content-type": "application/x-www-form-urlencoded"
      },
      auth: {
        user: process.env.CLIENT_ID,
        pass: process.env.CLIENT_SECRET
      },
      form: {
        grant_type: "client_credentials"
      },
      json: true
    },
    function(err, response, body) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      token = body.access_token;
      console.log("myTokenbody", body);
      res.json({
        tokenBody: body
      });
    }
  );
};

// let accessToken = "";
//////creating orders
const myItems = null;
exports.createOrders = (req, res, next) => {
  // console.log("body contntestss", req.body.token);
  accessToken = req.body.token.token; // extract token
  console.log("checkout items", req.body.items);
  console.log("checkout items", req.body.items.currency);

  // console.log(req.body.items);
  const myItems = req.body.items;

  // const myItems = JSON.parse(req.body.items);
  // console.log(myItems);

  request.post(
    "https://api.sandbox.paypal.com/v2/checkout/orders",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Partner-Attribution-Id": "FLAVORsb-2tosg7907703_MP"
      },
      mode: "cors",

      body: {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: myItems.currency,
              value: myItems.cartTotalPrice,
              breakdown: {
                item_total: {
                  /* Required when including the `items` array */
                  currency_code: myItems.currency,
                  value: myItems.cartTotalPrice
                }
              }
            },

            items: myItems.items,

            payee: {
              email_address: "sb-tp043i8211611@business.example.com",
              merchant_id: "JJ8C3XEUG8NXG"
            },
            payment_instruction: {
              disbursement_mode: "INSTANT"
              // platform_fees: [
              //   {
              //     amount: {
              //       currency_code: "USD",
              //       value: "10"
              //     }
              //   }
              // ]
            }
          }
        ]
      },
      json: true
    },
    function(err, response, body) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      console.log(body);
      res.json({
        id: body.id
      });
    }
  );
};
// express().post("/my-server/handle-approve/:id", function (req, res) {

exports.captureOrder = (req, res, next) => {
  var OrderID = req.params.id;
  // const accessToken = req.body.token;
  // console.log(accessToken);

  // console.log(OrderID);

  request.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders/" +
      OrderID +
      "/capture",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Partner-Attribution-Id": "FLAVORsb-2tosg7907703_MP"
      },
      mode: "cors"
    },
    function(err, response, body) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      // console.log(body);
      // console.log("payment", body);

      res.json({
        status: body
      });
    }
  );
};
