const controller = require("../controllers/controller");
const { Router } = require("express");
const pageRouter = Router();

// homepage
pageRouter.get("/", controller.homepageGet);

// details page
pageRouter.get("/details/:id", controller.detailsGet);

// form page
pageRouter.get("/new", controller.formGet);

// submit handler
pageRouter.post("/new", controller.formPost);

module.exports = pageRouter;
