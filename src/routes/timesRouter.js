const express = require("express");
const TimesController = require("../controllers/TimesController");

const timesRouter = express.Router();

timesRouter.get("/", TimesController.show);
timesRouter.post("/", TimesController.store);

module.exports = timesRouter;