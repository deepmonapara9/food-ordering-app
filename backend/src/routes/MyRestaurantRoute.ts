import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

// This will import the functions defined in the MyRestaurantController file
const router = express.Router();

// Importing the controller file for the my restaurant route to use the functions defined in it
// Multer is a middleware that is used to handle the multipart form data. It is used to upload files to the server.
const storage = multer.memoryStorage();

// This will allow only images to be uploaded to the server with the size limit of 5MB
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 25 * 1024 * 1024, //5MB, 25MB, 50MB
  },
});

// api/my/restaurant - This route will return the restaurant details of the logged in user
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

// api/my/restaurant - This route will return the restaurant details of the logged in user
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest, // This will validate the request body
  jwtCheck, // This will check if the user is logged in or not
  jwtParse, // This will parse the user id from the token
  MyRestaurantController.createMyRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest, 
  jwtCheck, 
  jwtParse,
  MyRestaurantController.updateMyRestaurant
);

export default router;
