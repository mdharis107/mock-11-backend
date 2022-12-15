const express = require("express");
const { connection } = require("./config/db");
const { BookmarkModel } = require("./models/bookmark.model");
const { ProductModel } = require("./models/product.model");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(cors());

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

app.delete("/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  let deleteProduct = await ProductModel.findOneAndDelete({ _id: productId });
  if (deleteProduct) {
    res.status(200).send("Deleted");
  } else {
    res.send("Couldn't delete");
  }
});

app.get("/bookmark", async (req, res) => {
  let Items = await BookmarkModel.find();
  res.send(Items);
});

app.post("/addBookmark", async (req, res) => {
  let Item = await ProductModel.find({ _id: req.query._id });
  const { title, quantity, priority, description } = Item[0];
  let bookmark = await BookmarkModel.find({
    title,
    quantity,
    priority,

    description,
  });
  console.log(Item, bookmark);
  if (bookmark == []) {
    res.send("Item Already in Bookmark");
  } else {
    const item = new BookmarkModel({
      title,
      quantity,
      priority,

      description,
    });
    console.log(item);
    await item.save();
    res.send("Item Added to Bookmark");
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
