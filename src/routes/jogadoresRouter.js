const express = require("express");
const JogadoresController = require("../controllers/JogadoresController");

const jogadoresRouter = express.Router();

jogadoresRouter.get("/", JogadoresController.index);
jogadoresRouter.get("/:id", JogadoresController.show);
jogadoresRouter.post("/", JogadoresController.store);
jogadoresRouter.put("/:id", JogadoresController.update);
jogadoresRouter.delete("/:id", JogadoresController.destroy);

module.exports = jogadoresRouter;