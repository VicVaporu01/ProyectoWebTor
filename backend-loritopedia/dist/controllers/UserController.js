"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.newUser = void 0;
const newUser = (req, res) => {
    const newUser = req.body;
    res.json({
        message: "Create User",
        body: newUser
    });
};
exports.newUser = newUser;
const login = (req, res) => {
    const loginUser = req.body;
    res.json({
        message: "Login user",
        body: loginUser
    });
};
exports.login = login;
