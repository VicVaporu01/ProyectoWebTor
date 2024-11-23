"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = createAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || "SECRET_KEY", { expiresIn: "1d" }, (error, token) => {
            if (error)
                reject(error);
            resolve(token);
        });
    });
}
