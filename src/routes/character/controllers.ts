import { Request, Response } from "express";
import axios from "axios";
import { Character, Params } from "./types";

const getCharacters = async (
  req: Request,
  res: Response<{
    message: string;
    data: any;
    error: boolean;
  }>
) => {
  try {
    let { sortby, page } = req.params;

    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    let data: Character[] = response.data.results;

    switch (sortby) {
      case Params.name:
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case Params.planet:
        data.sort((a, b) => (a.location.name > b.location.name ? 1 : -1));
        break;
      case Params.gender:
        data.sort((a, b) => (a.gender > b.gender ? 1 : -1));
        break;
      default:
        return res.status(400).json({
          message: "Invalid character criteria",
          data: undefined,
          error: false,
        });
    }

    return res.status(201).json({
      message: "Characters getted",
      data: data,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      data: undefined,
      error: true,
    });
  }
};

export default { getCharacters };
