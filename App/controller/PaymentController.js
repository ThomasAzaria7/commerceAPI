const express = require("express");
const app = express();
// var ejs = require("
var request = require("request");

exports.createOrders = (req, res, next) => {
  console.log(res.body);

  request.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      headers: {
        "Content-Type": "application/json",

        Authorization:
          "Bearer A21AAJeHmA2rQHhoX1CAJpn-XxnJm0S-sWni1zMARS9fr_UBVP4IEOZLwC5o4MXXP4vbze1b88jvEV5n7IzlG_uuu1oPsifvw",
        "PayPal-Partner-Attribution-Id": "FLAVORsb-2tosg7907703_MP"
      },
      mode: "cors",

      body: {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "100.00"
            },
            payee: {
              email_address: "sb-2tosg7907703@business.example.com"
            },
            payment_instruction: {
              disbursement_mode: "INSTANT",
              platform_fees: [
                {
                  amount: {
                    currency_code: "USD",
                    value: "25.00"
                  }
                }
              ]
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
  console.log(OrderID);

  request.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders/" +
      OrderID +
      "/capture",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer A21AAJeHmA2rQHhoX1CAJpn-XxnJm0S-sWni1zMARS9fr_UBVP4IEOZLwC5o4MXXP4vbze1b88jvEV5n7IzlG_uuu1oPsifvw",
        "PayPal-Partner-Attribution-Id": "FLAVORsb-2tosg7907703_MP"
      }
    },
    function(err, response, body) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      console.log(body);

      res.json({
        status: "success"
      });
    }
  );
};
