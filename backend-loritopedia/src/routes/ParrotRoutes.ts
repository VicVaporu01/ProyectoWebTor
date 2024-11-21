import {Router} from 'express';
import {createParrot, getParrots} from "../controllers/ParrotController";

const router = Router();

router.get("/", getParrots);
router.post("/", createParrot);

export default router;