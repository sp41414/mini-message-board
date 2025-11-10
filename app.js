const express = require("express");
const { Router } = require("express") // i have no idea how to make this a one-liner
const path = require("path");

const app = express();
const pageRouter = Router();

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

const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/new",
    text: "New Message",
  },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", pageRouter);

pageRouter.get("/", (_, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: messages,
    links: links,
  });
});

pageRouter.get("/new", (_, res) => {
  res.render("form", { title: "Mini Message Board", links: links });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Successfully ran server on port ${PORT}`);
});
