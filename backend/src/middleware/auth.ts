import { auth } from "express-oauth2-jwt-bearer";

// This middleware checks the JWT token in the Authorization header
export const jwtCheck = auth({
   audience: process.env.AUTH0_AUDIENCE,
   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
   tokenSigningAlg: 'RS256'
 });