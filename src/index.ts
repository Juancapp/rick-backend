import mongoose from "mongoose";
import app from "./app";
import firebaseApp from "./helpers/firebase";
require("dotenv").config();

const port = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL || "";

const mongooseConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    firebaseApp.appCheck();
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

mongooseConnect();
