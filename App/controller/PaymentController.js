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
          "Bearer f7ztpfjx8s5wq45w$a9dc847dfa8a9e1fdd5be8a2e5b34d41",
        "PayPal-Partner-Attribution-Id": "FLAVORsb-2tosg7907703_MP"
      },
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

// exports.createOrder;
