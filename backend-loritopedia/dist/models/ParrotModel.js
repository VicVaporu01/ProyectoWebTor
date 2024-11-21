"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const parrotSchema = new mongoose_1.default.Schema({
    scientificName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    colloquialName: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    lifeExpectancyInYears: {
        type: Number
    },
    photoLink: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("Parrot", parrotSchema);
