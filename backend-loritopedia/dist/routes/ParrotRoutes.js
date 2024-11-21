"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParrotController_1 = require("../controllers/ParrotController");
const router = (0, express_1.Router)();
router.get("/", ParrotController_1.getParrots);
router.post("/", ParrotController_1.createParrot);
exports.default = router;
