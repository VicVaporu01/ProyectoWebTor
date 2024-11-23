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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const ParrotRoutes_1 = __importDefault(require("../routes/ParrotRoutes"));
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
const DBConnection_1 = require("../db/DBConnection");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.connectDatabase();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.middlewares();
        this.routes();
    }
    connectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBConnection_1.connectDB)();
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            credentials: true,
            origin: ["http://localhost:4200"]
        }));
    }
    routes() {
        this.app.use("/api/users", UserRoutes_1.default);
        this.app.use('/api/parrots', ParrotRoutes_1.default);
    }
}
exports.default = Server;
