const express = require("express");

const app = express();

app.get("/welcome/:name", (req, res) => {
  let { name } = req.params;
  let { friends } = req.query;
  res.send(
    `Welcome ${name} ${
      friends == "true" ? "your friends" : ""
    } to Android Innovators `
  );
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
