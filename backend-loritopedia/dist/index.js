"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./models/Server"));
const dotenv_1 = __importDefault(require("dotenv"));
// MIDDLEWARES
dotenv_1.default.config();
const server = new Server_1.default();
