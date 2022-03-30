const express = require("express");

const app = express();

const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://root:root@cluster0.elgoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

var collection;

async function initDB() {
  await client.connect();
  const db = client.db("product_db");
  collection = db.collection("product_stock");
}

// GET
app.get("/welcome/:name", (req, res) => {
  let { name } = req.params;
  let { friends } = req.query;
  res.send(
    `Welcome ${name} ${
      friends == "true" ? "your friends" : ""
    } to Android Innovators `
  );
});

// POST
app.use(express.json());
app.post("/upload/product", (req, res) => {
  const product = req.body;
  const insertResult = await collection.insertOne(product);
  res.end("product was received");
});

// PATCH / UPDATE
app.path("/product/update", (req, res) => {
  let { update } = req.body;
  try {
    // code to update DB
    res.statusCode(200);
    res.end("Product updated successfully");
  } catch (e) {
    res.statusCode(500);
    res.end("Failed to update");
  }
});

// DELETE PRODUCT
app.delete("/product/:id", (req, res) => {
  let { id } = req.params;
  try {
    // code to delete product with this id in DB
    res.statusCode(200);
    res.end("Product deleted successfully");
  } catch (e) {
    res.statusCode(500);
    res.end("Failed to delete");
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
  initDB();
});
