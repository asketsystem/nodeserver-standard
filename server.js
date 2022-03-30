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

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
