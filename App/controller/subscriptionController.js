var request = require("request");

/// creating a subscription PRODUCT
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

/// creating a subscription PLAN  // basic /premium / etc

exports.createPlan = (req, res, next) => {
  request.post(
    "https://api-m.sandbox.paypal.com/v1/billing/plans",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer A21AAIzu9jSlSHJuXAHoFgLWzqZg6j3ABMebiBwyqgijgpCIjLXhplI4uzEwxMymh0BOoN2GezHqyh24vkZSYU-hMPG2-ol-A"
        // "PayPal-Request-Id": "123e4567-e89b-12d3-a456-426655440020",
        // "PayPal-Auth-Assertion":
        //   "AOdZvun5.QttWoS6t6vDMXAH9XRhAtBORWWvQpp4y8y5U5z9Cxk-FHAs"
      },

      body: {
        product_id: `${product_id}`,
        name: "Basic Plan",
        description: "Basic plan",
        billing_cycles: [
          {
            frequency: {
              interval_unit: "MONTH",
              interval_count: 1
            },
            tenure_type: "TRIAL",
            sequence: 1,
            total_cycles: 1
          },
          {
            frequency: {
              interval_unit: "MONTH",
              interval_count: 1
            },
            tenure_type: "REGULAR",
            sequence: 2,
            total_cycles: 12,
            pricing_scheme: {
              fixed_price: {
                value: "10",
                currency_code: "USD"
              }
            }
          }
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee: {
            value: "10",
            currency_code: "USD"
          },
          setup_fee_failure_action: "CONTINUE",
          payment_failure_threshold: 3
        },
        taxes: {
          percentage: "10",
          inclusive: false
        }
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

/////
////

// subscribe a user to a Plan with the desired plan id
exports.userSubscribe = (req, res, next) => {
  request.post(
    "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer A21AAIzu9jSlSHJuXAHoFgLWzqZg6j3ABMebiBwyqgijgpCIjLXhplI4uzEwxMymh0BOoN2GezHqyh24vkZSYU-hMPG2-ol-A"
        // "PayPal-Request-Id": "123e4567-e89b-12d3-a456-426655440020",
        // "PayPal-Auth-Assertion":
        //   "AOdZvun5.QttWoS6t6vDMXAH9XRhAtBORWWvQpp4y8y5U5z9Cxk-FHAs"
      },

      body: {
        plan_id: "P-9WT24975K9078230AMF5VMQQ", // plan id a user is subscribing to
        start_time: "2021-10-29T02:30:00Z", // time must be in the future
        shipping_amount: {
          currency_code: "USD",
          value: "10.00"
        },
        subscriber: {
          // subscriber info
          name: {
            given_name: "John",
            surname: "Doe"
          },
          email_address: "customer@example.com",
          shipping_address: {
            name: {
              full_name: "John j Doe"
            },
            address: {
              address_line_1: "2211 N First Street",
              address_line_2: "Building 17",
              admin_area_2: "San Jose",
              admin_area_1: "CA",
              postal_code: "95131",
              country_code: "US"
            }
          }
        }
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
