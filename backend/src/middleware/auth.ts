<<<<<<< HEAD
import { NextFunction, Request, Response } from "express";
=======
import { NextFunction, Response, Request } from "express";
>>>>>>> origin/main
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/users";

<<<<<<< HEAD
declare global {
  namespace Express {
    interface Request {
      userId: string,
      auth0Id: string,
=======
// Augment the Express Request type to include the Auth0 ID and user ID
declare global {
  namespace Express {
    interface Request {
      auth0Id?: string;
      userId?: string;
>>>>>>> origin/main
    }
  }
}

// This middleware checks the JWT token in the Authorization header
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

<<<<<<< HEAD
// This will parse the JWT token and add the user object to the request
// here using Promise<void> to make sure that the function is async and returns a Promise
=======
// This middleware parses the JWT token in the Authorization header
>>>>>>> origin/main
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
<<<<<<< HEAD
  const { authorization } = req.headers;

=======
  // Check if the Authorization header is missing
  const { authorization } = req.headers;

  // Check if the Authorization header is missing
>>>>>>> origin/main
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.sendStatus(401);
    return;
  }

  // Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
<<<<<<< HEAD
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });

=======
  // Split the Authorization header to get the token
  const token = authorization.split(" ")[1];

  try {
    // Decode the JWT token to get the Auth0 ID
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    // Find the user in the database using the Auth0 ID
    const user = await User.findOne({ auth0Id });

    // Check if the user does not exist
>>>>>>> origin/main
    if (!user) {
      res.sendStatus(401);
      return;
    }

<<<<<<< HEAD
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
=======
    // Attach the Auth0 ID and user ID to the request object
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    // Call the next middleware
    next();
  } catch (error) {
    res.sendStatus(401);
    return;
  }
};
>>>>>>> origin/main
