import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// This middleware will check if there are any validation errors
const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return
   }
   next();
};

// This middleware validates the request body for the createMyUserRequest
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("addressLine1").isString().notEmpty().withMessage("Address is required"),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("country").isString().notEmpty().withMessage("Country is required"),
  handleValidationErrors,
];
