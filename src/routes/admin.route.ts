import {Router, Request, Response} from "express";
import {registerAdmin, loginAdmin} from "../controllers/admin.controller";
const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
