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
exports.createParrot = exports.getParrots = void 0;
const ParrotModel_1 = __importDefault(require("../models/ParrotModel"));
const getParrots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parrots = yield ParrotModel_1.default.find();
        res.status(200).json({
            parrots
        });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json();
    }
});
exports.getParrots = getParrots;
const createParrot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { scientificName, colloquialName, description, lifeExpectancyInYears, photoLink } = req.body;
    try {
        const newParrot = new ParrotModel_1.default({
            scientificName,
            colloquialName,
            description,
            lifeExpectancyInYears,
            photoLink
        });
        const savedParrot = yield newParrot.save();
        res.status(201).json({
            message: "Create Parrot with data:",
            data: savedParrot
        });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json();
    }
});
exports.createParrot = createParrot;
