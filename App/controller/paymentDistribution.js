const request = require("request");
exports.sendPayment = (req, res) => {
	console.log("payouts api", req.body);
	const token = JSON.parse(req.body.authToken);
	console.log("my token", token.token);
	const payoutPrice = req.body.payoutPrice;
	request.post(
		"https://api-m.sandbox.paypal.com/v1/payments/payouts ",
		{
			headers: {
				"content-type": "application/json",

				Authorization: `Bearer ${token.token}`,
			},
			// auth: {
			//   user:
			//     "AdtHDpc8KGWZpCoHiBUdh9GxOTuuxs4jWbhrHrM-j7uMDzD071fRbakJlvX79cLPjJi7d2P-NyPdUsoW",
			//   pass:
			//     "EMKjAmfIPUXGwdmzRH_q-uck2ux5KAhMk7w2zfzctca3yhaXUgrQvikerW183LdePn0fg68ewaDBgDnZ"
			// },
			// form: {
			//   grant_type: "client_credentials"
			// },
			body: {
				sender_batch_header: {
					//   "sender_batch_id": "",
					recipient_type: "EMAIL",
					email_subject: "You have money!",
					email_message:
						"You received a payment. Thanks for using our service!",
				},
				items: [
					{
						amount: {
							value: payoutPrice,
							currency: "AUD",
						},
						sender_item_id: "201403140001",
						recipient_wallet: "PAYPAL",
						receiver: "thomas.azaria7@gmail.com",
					},
					// {
					//   amount: {
					//     value: "5",
					//     currency: "USD"
					//   },
					//   sender_item_id: "201403140002",
					//   recipient_wallet: "PAYPAL",
					//   receiver: "sellershop@store.com"
					// }
				],
			},
			json: true,
		},
		function (err, response, body) {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}

			console.log(body);

			res.json({
				id: body,
			});
		}
	);
};

exports.getPayoutConfirmation = (req, res) => {
	request.get(
		"https://api.sandbox.paypal.com/v1/payments/payouts/8TR8BZFWAQWSQ",
		{
			headers: {
				"content-type": "application/json",

				Authorization:
					"Bearer A21AAJr0fzBiKypbrVCMvJJ4glqUOztKMILBdoCP8mQZ1inIkymHLSb1KnTihHvx-Y5lou6OoUwuSWsfiCV3MJrDxqe1N8sSQ",
			},
			json: true,
		},
		function (err, response, body) {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}

			console.log(body);

			res.json({
				id: body,
			});
		}
	);
};
