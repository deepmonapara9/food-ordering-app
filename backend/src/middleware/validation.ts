<<<<<<< HEAD
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// This middleware will check if there are any validation errors
const handleValidationErrors = async (
=======
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

// This middleware handles validation errors
const handleValidationError = async (
>>>>>>> origin/main
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
<<<<<<< HEAD
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
=======
  // Check if there are any validation errors
  const errors = validationResult(req);

  // If there are no validation errors, call the next middleware
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

// This middleware validates the request body for the createCurrentUser controller
export const validateMyUserRequest = [
  // Check if the name field is missing
  body("name").isString().notEmpty().withMessage("Name is must be a string"),

  // Check if the addressLine1 field is missing
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line 1 is must be a string"),

  // Check if the city field is missing
  body("city").isString().notEmpty().withMessage("City is must be a string"),

  // Check if the country field is missing
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country is must be a string"),

  // Call the handleValidationError middleware
  handleValidationError,
>>>>>>> origin/main
];
