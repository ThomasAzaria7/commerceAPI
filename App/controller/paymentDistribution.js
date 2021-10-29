const request = require("request");

exports.sendPayment = (req, res) => {
  request.post(
    "https://api-m.sandbox.paypal.com/v1/payments/payouts ",
    {
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer A21AAJwhpQCi_fAQTlMITwaZJk7KvwxfgxenOgAMqSh0raWC5taffJw_XSlO4XVUzd1O9WBAZlV_NIkr9kJBSZMQnTW2ECTKw"
      },
      body: {
        sender_batch_header: {
          //   "sender_batch_id": "",
          recipient_type: "EMAIL",
          email_subject: "You have money!",
          email_message: "You received a payment. Thanks for using our service!"
        },
        items: [
          {
            amount: {
              value: "8",
              currency: "USD"
            },
            sender_item_id: "201403140001",
            recipient_wallet: "PAYPAL",
            receiver: "thomas.azaria7@gmail.com"
          },
          {
            amount: {
              value: "5",
              currency: "USD"
            },
            sender_item_id: "201403140002",
            recipient_wallet: "PAYPAL",
            receiver: "sellershop@store.com"
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
        id: body
      });
    }
  );
};
