import {Request, Response} from 'express';
import Parrot from "../models/ParrotModel";

export const getParrots = async (req: Request, res: Response) => {
    try {
        const parrots = await Parrot.find();

        res.status(200).json({
            parrots
        });
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        res.status(500).json();
    }
}

export const createParrot = async (req: Request, res: Response) => {
    const {scientificName, colloquialName, description, lifeExpectancyInYears, photoLink} = req.body;

    try {
        const newParrot = new Parrot({
            scientificName,
            colloquialName,
            description,
            lifeExpectancyInYears,
            photoLink
        });

        const savedParrot = await newParrot.save();

        res.status(201).json({
            message: "Create Parrot with data:",
            data: savedParrot
        });
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        res.status(500).json();
    }
}