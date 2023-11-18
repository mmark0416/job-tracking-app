import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError
} from "../errors/customError.js";
import { verifyJWT } from "../utils/token.utils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "6557ab64a0f6773ccd2b4746"
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("Not authorized to access this route");
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User. Read Only");
  next();
}
