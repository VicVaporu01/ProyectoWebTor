import {Router} from 'express';
import {createParrot, getParrots} from "../controllers/ParrotController";
import {authRequired} from "../middlewares/ValidateToken";

const router = Router();

// @ts-ignore
router.get("/", getParrots);
// @ts-ignore
router.post("/", authRequired, createParrot);

export default router;