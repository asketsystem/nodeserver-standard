const express = require("express");

const app = express();

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
  console.log(product);
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
});
