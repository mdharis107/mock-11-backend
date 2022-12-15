const express = require("express");
const { connection } = require("./config/db");
const { ProductModel } = require("./models/product.model");
// const cors = require("cors")

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/product", async (req, res) => {
  const { title, quantity, priority, description } = req.body;
  const product = new ProductModel({
    title,
    quantity,
    priority,
    description,
  });

  try {
    await product.save();
    res.send("Note Created");
  } catch (err) {
    res.send("Something went wrong,please try again later");
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log(`listening on PORT ${PORT}`);
});
