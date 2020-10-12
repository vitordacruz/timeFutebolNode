require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
require("express-async-errors");
const sequelize = require("./config/db");
const { ValidationError } = require("yup");
const BusinessException = require("./common/exceptions/BusinessException");
const server_port = "3000";


const app = express();
app.use(morgan("combine"));
app.use(express.json());


app.use((err, req, res, next) => {
  if (err instanceof BusinessException) {
    const errorDetail = {
      detail: [err.message],
      code: err.code,
      dateTime: new Date().toISOString(),
    }

    // BAD Request
    res.status(400).json(errorDetail);
  } else if (err instanceof ValidationError) {
    const errorDetail = {
      detail: err.errors,
      code: "VAL_01",
      dateTime: new Date().toISOString(),
    }

    //BAD_REQUEST
    res.status(400).json(errorDetail);
  } else {
    // Internal Server Error
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(server_port, () => {
  console.log(`Servidor iniciou na porta ${server_port}`);
});
