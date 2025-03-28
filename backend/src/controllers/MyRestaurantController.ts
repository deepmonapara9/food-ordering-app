import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

// This will get the restaurant details of the logged in user and return it in the response
const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found..." });
      return;
    }
    res.json(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching restaurant..." });
  }
};

// In this it will create restaurant for the logged in user but for only once if it is already created then it will update the restaurant details or just return the restaurant details
const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    // Check if the restaurant already exists for the logged in user
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      res.status(409).json({ message: "Restaurant already exists..." });
      return;
    }

    // this is called from the uploadImage function to upload the image to the cloudinary server
    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    // This will create the restaurant object with the details provided in the request
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in RC..." });
  }
};

// This will update the restaurant details of the logged in user
const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    // this will find the restaurant of the logged in user
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found..." });
      return;
    }

    // Update the restaurant details with the values provided in the request body
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    // If the image is provided in the request then upload the image to the cloudinary server and update the image URL in the restaurant object
    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error updating restaurant..." });
  }
};

// This function will upload the image to the cloudinary server and turns the image into a URL and it is used in the createMyRestaurant function and in the updateMyRestaurant function
const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default { createMyRestaurant, getMyRestaurant, updateMyRestaurant };
