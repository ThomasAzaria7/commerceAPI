var request = require("request");

exports.createProduct = (req, res, next) => {
  request.post(
    "https://api-m.sandbox.paypal.com/v1/catalogs/products",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer A21AAIzu9jSlSHJuXAHoFgLWzqZg6j3ABMebiBwyqgijgpCIjLXhplI4uzEwxMymh0BOoN2GezHqyh24vkZSYU-hMPG2-ol-A",
        "PayPal-Request-Id": "123e4567-e89b-12d3-a456-426655440020",
        "PayPal-Auth-Assertion":
          "AOdZvun5.QttWoS6t6vDMXAH9XRhAtBORWWvQpp4y8y5U5z9Cxk-FHAs"
      },

      body: {
        name: "Video Streaming Service",
        description: "A video streaming service",
        type: "SERVICE",
        category: "SOFTWARE",
        image_url: "https://example.com/streaming.jpg",
        home_url: "https://example.com/home"
      },
      json: true
    },
    function(err, response, body) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      console.log(body);
      //   res.json({
      //     id: body.id
      //   });
    }
  );
};
