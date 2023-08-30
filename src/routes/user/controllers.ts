import { Request, Response } from "express";
import User from "../../models/User";
import { UserType } from "../../models/types";
import firebaseApp from "../../helpers/firebase";

const createUser = async (
  req: Request,
  res: Response<{
    message: string;
    data: UserType | undefined;
    error: boolean;
  }>
) => {
  try {
    const findByEmail = await User.find({ email: req.body.email });
    if (findByEmail.length > 0) {
      return res.status(400).json({
        message: "There is already an user with that email",
        data: undefined,
        error: true,
      });
    }

    const findByNick = await User.find({ email: req.body.nick });
    if (findByNick.length > 0) {
      return res.status(400).json({
        message: "There is already an user with that nick",
        data: undefined,
        error: true,
      });
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = new User({
      nick: req.body.nick,
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    });

    const result = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const editFavoriteCharacter = async (
  req: Request,
  res: Response<{
    message: string;
    data: UserType | undefined;
    error: boolean;
  }>
) => {
  try {
    const foundUser = await User.findById(req.body.userId);
    if (!foundUser) throw new Error();

    const characterExists = foundUser.favoriteCharacters?.some(
      (character) => character === req.body.characterId
    );

    let updatedUser;

    if (!characterExists) {
      updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { favoriteCharacters: req.body.characterId } },
        { new: true }
      );
      if (!updatedUser) throw new Error();
    } else {
      updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $pull: { favoriteCharacters: req.body.characterId } },
        { new: true }
      );
      if (!updatedUser) throw new Error();
    }

    return res.status(200).json({
      message: `Favorite character ${
        !characterExists ? "added" : "deleted"
      } succesfully`,
      data: updatedUser,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default { createUser, editFavoriteCharacter };
