"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParrotController_1 = require("../controllers/ParrotController");
const ValidateToken_1 = require("../middlewares/ValidateToken");
const router = (0, express_1.Router)();
// @ts-ignore
router.get("/", ParrotController_1.getParrots);
// @ts-ignore
router.post("/", ValidateToken_1.authRequired, ParrotController_1.createParrot);
exports.default = router;
