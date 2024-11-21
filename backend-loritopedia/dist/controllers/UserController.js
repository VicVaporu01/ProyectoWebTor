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
exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new UserModel_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const userFound = yield UserModel_1.default.findOne({ email: newUser.email });
        if (userFound)
            return res.status(400).json({
                message: "Email already exists"
            });
        newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
        const userSaved = yield newUser.save();
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
exports.newUser = newUser;
const login = (req, res) => {
    const loginUser = req.body;
    res.json({
        message: "Login user",
        body: loginUser
    });
};
exports.login = login;
