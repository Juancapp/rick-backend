import { ObjectId } from "mongoose";

export interface UserType {
  _id: ObjectId | string;
  firebaseUid?: string;
  nick: string;
  email: string;
  favoriteCharacters?: string[];
}
