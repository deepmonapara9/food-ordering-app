import { Request, Response } from "express";
import User from "../models/users";

const createCurrentUser = async (req: Request, res: Response) => {
  // 1. check if the user already exists in the database
  // 2. create the user if it doesn't exist
  // 3. return the user object to the calling client

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(200).send();
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default {
  createCurrentUser,
};
