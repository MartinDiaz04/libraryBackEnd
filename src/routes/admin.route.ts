import {Router, Request, Response} from "express";
import {registerAdmin, loginAdmin} from "../controllers/admin.controller";
import checkJwt from "../middleware/session";
const router = Router();

router.post("/register", checkJwt, registerAdmin);
router.post("/login", loginAdmin);

export default router;
