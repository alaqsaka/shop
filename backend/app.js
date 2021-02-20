const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");
//middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json()); // Membuat program mengerti bahwa akan ada file JSON yang dikirim dari frontend
app.use(morgan("tiny"));

// Routes
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const usersRouter = require("./routers/users");
const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

// DATABASE SETUP
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Successfully connected to database!"); // Jika berhasil connect ke database akan mencetak ini
  })
  .catch((err) => {
    console.log(err); // Jika gagal akan mencetak, dimana kesalahannya (err)
  });

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
