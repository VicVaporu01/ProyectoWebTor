import {Router} from "express";
import {login, logout, register} from "../controllers/UserController";

const router = Router();

// @ts-ignore
router.post("/register", register);
// @ts-ignore
router.post("/login", login);
// @ts-ignore
router.get("/logout", logout);

export default router;