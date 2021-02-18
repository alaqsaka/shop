const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

//middleware
app.use(bodyParser.json()); // Membuat program mengerti bahwa akan ada file JSON yang dikirim dari frontend
app.use(morgan("tiny"));

require("dotenv/config");

const productsRouter = require("./routers/products");
const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);

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
