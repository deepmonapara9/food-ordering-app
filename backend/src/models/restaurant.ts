import mongoose, { InferSchemaType } from "mongoose";

// Define the schema for the menu item in the restaurant schema
const menuItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Create a model for the menu item schema which will be used to interact with the database
export type MenuItemType = InferSchemaType<typeof menuItemSchema>;

// Define the schema for the restaurant in the database for the logged in user
const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

// Create a model for the restaurant schema which will be used to interact with the database
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
