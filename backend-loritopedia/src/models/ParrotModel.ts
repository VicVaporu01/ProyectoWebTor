import mongoose from "mongoose";

const parrotSchema = new mongoose.Schema({
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

export default mongoose.model("Parrot", parrotSchema);