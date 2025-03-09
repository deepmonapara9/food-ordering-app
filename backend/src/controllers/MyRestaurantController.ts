import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

// In this it will create restaurant for the logged in user but for only once if it is already created then it will update the restaurant details or just return the restaurant details
const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    // Check if the restaurant already exists for the logged in user
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      res.status(409).json({ message: "Restaurant already exists..." });
      return;
    }

    // This will get the image file from the request
    const image = req.file as Express.Multer.File;

    // This will convert the image to base64 format
    const base64Image = Buffer.from(image.buffer).toString("base64");

    // This will create the data URI for the image which will be used to display the image on the frontend
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // This will upload the image to the cloudinary server
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    // This will create the restaurant object with the details provided in the request
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in RC..." });
  }
};

export default { createMyRestaurant };