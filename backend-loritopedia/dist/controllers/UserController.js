"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const Jwt_1 = require("../libs/Jwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new UserModel_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const userFound = yield UserModel_1.default.findOne({ email: newUser.email });
        if (userFound)
            return res.status(400).json({
                message: "Email already exists",
            });
        newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
        const userSaved = yield newUser.save();
        // Create the access token
        const token = yield (0, Jwt_1.createAccessToken)({
            id: userSaved._id,
            email: userSaved.email
        });
        res.status(201).json({
            message: `User ${userSaved.username} created successfully`,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating user",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUser = req.body;
    try {
        const userFound = yield UserModel_1.default.findOne({ email: loginUser.email });
        if (!userFound)
            return res.status(400).json({
                message: "Invalid credentials",
            });
        const isMatchPassword = yield bcrypt_1.default.compare(loginUser.password, userFound.password);
        if (!isMatchPassword)
            return res.status(400).json({
                message: "Invalid credentials",
            });
        const token = yield (0, Jwt_1.createAccessToken)({
            id: userFound._id,
            email: userFound.email
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: `Welcome ${userFound.username}`,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error login user",
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.status(200).json({
        message: "Logout successfully"
    });
});
exports.logout = logout;
