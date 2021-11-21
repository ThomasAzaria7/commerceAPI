const express = require("express");
const app = express();
require("dotenv").config(); 
// const bodyParser = require("body-parser");

//modules
const processBuyerOrder = require("./App/routes/PayPalPayments");
const subscriptionPlan = require("./App/routes/subscriptionsRoute");
const email = require("./App/routes/emailRoutes");

//config
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"),
		res.setHeader("Access-Control-Allow-Methods", "Get,Post,Put,Patch,Delete"),
		res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization"),
		next();
});

// parser body
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//

app.set("view engine", "ejs");
app.set("views", "views");

// middlewares
app.use("/my-server", processBuyerOrder.processBuyerOrder); //  my-server/create-order
app.use("/my-server", processBuyerOrder.captureBuyerOrder); //  my-server/
app.use("/my-server", processBuyerOrder.getAccessToken); //        my-server/token
//

//subscriptions
app.use("/my-server", subscriptionPlan.createProduct); //  /my-server/create-subscription-product
app.use("/my-server", subscriptionPlan.createPlans); //  /my-server/create-subscription-Plans
app.use("/my-server", subscriptionPlan.createsubscriber); //  /my-server/user-subscription
// app.use("/my-server", subscriptionPlan.createProduct); //  /my-server/
// app.use("/my-server", subscriptionPlan.createProduct); //  /my-server/
// app.use("/my-server", subscriptionPlan.createProduct); //  /my-server/
//end of subscriptions

/*
 *  email  Routes
 */

app.use("/my-server", email.recipt); // my-server/send-recipt
//end of email

/*
 * recipts
 */
app.use("/my-server", processBuyerOrder.getOrders); // /my-server/product

//
/*
 *payouts
 */
app.use("/my-server", processBuyerOrder.payout); //  /my-server/pay-clients
app.use("/my-server", processBuyerOrder.payoutConfirmation);
// run server
app.listen( process.env.PORT||3000);
