import {Request, Response} from "express";
import bcrypt from "bcrypt";
import User from "../models/UserModel";

export const newUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const userFound = await User.findOne({email: newUser.email});
        if (userFound) return res.status(400).json({
            message: "Email already exists"
        });

        newUser.password = await bcrypt.hash(newUser.password, 10);

        const userSaved = await newUser.save();

        res.status(201).json({
            message: `User ${userSaved.username} created successfully`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
        });
    }
}

export const login = (req: Request, res: Response) => {
    const loginUser = req.body;

    res.json({
        message: "Login user",
        body: loginUser
    });
}