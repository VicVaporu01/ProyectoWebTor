import {Router} from 'express';
import {getParrots} from "../controllers/parrot";

const router = Router();

router.get("/", getParrots);

export default router;