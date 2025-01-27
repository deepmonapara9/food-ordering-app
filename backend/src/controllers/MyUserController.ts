import { NextFunction, Request, Response } from "express";
import User from "../models/users";

// This controller creates a new user in the database
const createCurrentUser = async (req: Request, res: Response) => {
  // 1. check if the user already exists in the database
  // 2. create the user if it doesn't exist
  // 3. return the user object to the calling client

  try {
    // Check if the user already exists in the database
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    // If the user already exists, return the user object
    if (existingUser) {
      res.status(200).send();
      return;
    }

    // Create the user if it doesn't exist
    const newUser = new User(req.body);

    // Save the user object to the database
    await newUser.save();

    // Return the user object to the calling client
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// This controller updates the current user in the database
const updateCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 1. find the user in the database
    // 2. update the user object with the new values
    // 3. save the updated user object to the database
    // 4. return the updated user object to the calling client

    // Get the user object from the request body
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    // Check if the user does not exist
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update the user object with the new values
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    // Save the updated user object to the database
    await user.save();

    // Return the updated user object to the calling client
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
};
