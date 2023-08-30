import express from "express";
// import router from "./routes";
var cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// app.use("/", router);

app.get("/", (_req, res) => {
  res.status(200).send({
    message: `Server connected, PORT: ${process.env.ENV}`,
    data: undefined,
    error: false,
  });
});

export default app;
