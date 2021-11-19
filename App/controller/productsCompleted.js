const express = require("express");

const request = require("request");

exports.getCompletedProducts = (req, res) => {
  OrderID = req.params.id;
  console.log("my order id is", OrderID);

  // reciptId = req.body.itemId;
  request.get(
    "https://api.sandbox.paypal.com/v2/checkout/orders/" + OrderID,
    {
      headers: {
        "content-type": "application/json"
      },
      auth: {
        user:
          "AdtHDpc8KGWZpCoHiBUdh9GxOTuuxs4jWbhrHrM-j7uMDzD071fRbakJlvX79cLPjJi7d2P-NyPdUsoW",
        pass:
          "EMKjAmfIPUXGwdmzRH_q-uck2ux5KAhMk7w2zfzctca3yhaXUgrQvikerW183LdePn0fg68ewaDBgDnZ"
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
      console.log(body);
      // console.log("payment", body.payments.captures);
      res.json({
        body
      });
    }
  );
};
