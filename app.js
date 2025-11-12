require("dotenv").config();
const express = require("express");
const path = require("path");
const pageRouter = require("./router/pageRouter");

const app = express();

// code to use ejs from views dir
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse form data into req.body
app.use(express.urlencoded({ extended: true }));
// css
const assets = path.join(__dirname, "public");
app.use(express.static(assets));

// this HAS to come after or it breaks!
app.use("/", pageRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Successfully ran server on port ${PORT}`);
});
