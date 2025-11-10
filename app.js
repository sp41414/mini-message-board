const express = require("express");
const path = require("path");

const app = express();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (_, res) => {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Successfully ran server on port ${PORT}`);
});
