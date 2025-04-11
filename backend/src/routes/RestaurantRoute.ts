import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

// /api/restaurant
// /api/restaurant/:restaurantId
// this will fetch the restaurant details based on the restaurantId
router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("restaurantId parameter must be a valid string."),
  RestaurantController.getRestaurant
);

// /api/restaurant/search/mumbai
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string."),
  RestaurantController.searchRestaurants
);

export default router;
