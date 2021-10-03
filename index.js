const express = require("express");
const app = express();
// const bodyParser = require("body-parser");

//modules
const processBuyerOrder = require("./App/routes/PayPalPayments");

//config
// app.use(bodyParser);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Methods", "Get,Post,Put,Patch,Delete"),
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization"),
    next();
});

// middlewares
app.use("/my-server", processBuyerOrder.processBuyerOrder); //  my-server/create-order
// run server

app.listen(3000);
