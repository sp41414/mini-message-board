const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateMessage = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must only contain characters and numbers")
    .isLength({ min: 1, max: 20 })
    .withMessage("Username must be between 1 and 20 characters"),
  body("message")
    .trim()
    .matches(/^[a-zA-Z0-9 \n]*$/)
    .withMessage(`Message must only contain characters, numbers and spaces`)
    .isLength({ min: 1, max: 200 })
    .withMessage("Message must be between 1 and 200 characters")
    .escape(),
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

const homepageGet = async (_, res) => {
  try {
    const messages = await db.queryMessages();
    res.render("index", {
      title: "Mini Message Board",
      messages: messages || ["Hello"],
      links: links,
    });
  } catch (err) {
    console.error(err);
    res.render("index", { title: "Mini Message Board", links: links }); // temporary
  }
};

const detailsGet = async (req, res) => {
  const id = req.params.id;
  const message = await db.fetchMessage(id);
  if (!message) {
    res.status(500);
    return;
  }
  res.render("details", {
    title: "Mini Message Board",
    message: message,
    links: links,
  });
};

const formGet = async (_, res) => {
  res.render("form", { title: "Mini Message Board", links: links });
};

const formPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("form", {
        title: "Mini Message Board",
        links: links,
        errors: errors.errors,
      });
    }
    const { username, message } = matchedData(req);
    try {
      await db.insertMessage({
        text: message,
        user: username,
      });
    } catch (err) {
      res.status(500);
      return;
    } finally {
      res.redirect("/");
    }
  },
];

module.exports = {
  homepageGet,
  detailsGet,
  formGet,
  formPost,
};
