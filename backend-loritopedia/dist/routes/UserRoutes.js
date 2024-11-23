"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
// @ts-ignore
router.post("/register", UserController_1.register);
// @ts-ignore
router.post("/login", UserController_1.login);
// @ts-ignore
router.get("/logout", UserController_1.logout);
exports.default = router;
