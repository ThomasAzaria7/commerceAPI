const express = require("express");

const request = require("request");

exports.getCompletedProducts = (req, res) => {
  req.body.orderId;
  request.get(
    "https://api.sandbox.paypal.com/v2/checkout/orders/19U6582339168332F",
    {
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer A21AAJwhpQCi_fAQTlMITwaZJk7KvwxfgxenOgAMqSh0raWC5taffJw_XSlO4XVUzd1O9WBAZlV_NIkr9kJBSZMQnTW2ECTKw"
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
        id: body
      });
    }
  );
};
