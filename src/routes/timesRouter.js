const express = require("express");
const TimesController = require("../controllers/TimesController");

const timesRouter = express.Router();

timesRouter.get("/", TimesController.index);
timesRouter.get("/:id", TimesController.show);
timesRouter.post("/", TimesController.store);
timesRouter.put("/:id", TimesController.update);
timesRouter.delete("/:id", TimesController.destroy);

module.exports = timesRouter;