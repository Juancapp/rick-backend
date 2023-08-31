import mongoose, { Schema, model } from "mongoose";
import { UserType } from "./types";

const User = new mongoose.Schema({
  nick: {
    type: String,
    require: true,
  },
  firebaseUid: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  favoriteCharacters: [{ type: Number, required: false }],
});

export default model<UserType>("User", User);
