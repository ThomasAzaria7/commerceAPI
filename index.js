const express = require("express");
const app = express();
// const bodyParser = require("body-parser");

//modules
const processBuyerOrder = require("./App/routes/PayPalPayments");
const subscriptionPlan = require("./App/routes/subscriptionRoute");

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

// middlewares
app.use("/my-server", processBuyerOrder.processBuyerOrder); //  my-server/create-order
app.use("/my-server", processBuyerOrder.captureBuyerOrder); //  my-server/
app.use("/my-server", processBuyerOrder.getAccessToken); //        my-server/token
//

app.use("/my-server", subscriptionPlan.createProduct); //  /my-server/createSubscribeProduct

// run server
app.listen(3000);
