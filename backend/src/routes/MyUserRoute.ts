import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// This route is protected by the jwtCheck middleware
router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;