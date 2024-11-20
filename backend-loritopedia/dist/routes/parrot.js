"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parrot_1 = require("../controllers/parrot");
const router = (0, express_1.Router)();
router.get("/", parrot_1.getParrots);
exports.default = router;
