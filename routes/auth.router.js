import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validation.js";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {msg: 'IP rate limit exceeded, retry in 15 minutes'}
})

const router = Router();

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
