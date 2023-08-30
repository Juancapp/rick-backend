import { Request, Response } from "express";
import axios from "axios";
import { Params } from "./types";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const getCharacters = async (
  req: Request,
  res: Response<{
    message: string;
    data: any;
    error: boolean;
  }>
) => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    let data: Character[] = response.data.results;

    let { sortby } = req.params || Params.name;
    console.log("SORT BY: ", sortby);

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
