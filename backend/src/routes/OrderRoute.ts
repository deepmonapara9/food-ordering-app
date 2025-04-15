import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post(
  "/checkout/create-checkout-sesion",
  jwtCheck,
  jwtParse,
  OrderController.createCheckoutSession
);

export default router;