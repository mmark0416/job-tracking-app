import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/user.controller.js";
import { validateUpdateUserInput } from "../middleware/validation.js";
import { authorizePermissions } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/current-user", getCurrentUser); 
router.get("/admin/app-stats", [authorizePermissions("admin"), getApplicationStats]); 
router.patch("/update-user", validateUpdateUserInput, updateUser); 

export default router;