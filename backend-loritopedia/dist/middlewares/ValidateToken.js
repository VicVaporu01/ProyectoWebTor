"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res.status(401).json({ message: "No autorizado." });
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "SECRET_KEY", (error, user) => {
            if (error)
                return res.status(401).json({ message: "No autorizado." });
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error en el servidor." });
    }
};
exports.authRequired = authRequired;
