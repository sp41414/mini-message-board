const express = require("express");
const { Router } = require("express") // i have no idea how to make this a one-liner
const path = require("path");

const app = express();
const pageRouter = Router(); // i just wanted to use router to get some practice idk

// fake database
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

// for navbar component
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

// code to use ejs from views dir
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse form data into req.body
app.use(express.urlencoded({extended: true}))
// this HAS to come after or it breaks!
app.use("/", pageRouter);

// homepage
pageRouter.get("/", (_, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: messages,
    links: links,
  });
});

// form page
pageRouter.get("/new", (_, res) => {
  res.render("form", { title: "Mini Message Board", links: links });
});

// submit handler
pageRouter.post("/new", (req, res) => {
  messages.push({text: req.body.message, user: req.body.username, added: new Date()})
  res.redirect("/")
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Successfully ran server on port ${PORT}`);
});
