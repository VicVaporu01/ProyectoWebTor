import {Request, Response} from "express";
import bcrypt from "bcrypt";
import User from "../models/UserModel";
import {createAccessToken} from "../libs/Jwt";

export const register = async (req: Request, res: Response) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const userFound = await User.findOne({email: newUser.email});
        if (userFound) return res.status(400).json({
            message: "Email already exists",
        });

        newUser.password = await bcrypt.hash(newUser.password, 10);

        const userSaved = await newUser.save();

        // Create the access token
        const token = await createAccessToken({
            id: userSaved._id,
            email: userSaved.email
        })

        res.status(201).json({
            message: `User ${userSaved.username} created successfully`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
        });
    }
}

export const login = async (req: Request, res: Response) => {
    const loginUser = req.body;

    try {

        const userFound = await User.findOne({email: loginUser.email});
        if (!userFound) return res.status(400).json({
            message: "Invalid credentials",
        });

        const isMatchPassword = await bcrypt.compare(loginUser.password, userFound.password);
        if (!isMatchPassword) return res.status(400).json({
            message: "Invalid credentials",
        });

        const token = await createAccessToken({
            id: userFound._id,
            email: userFound.email
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: `Welcome ${userFound.username}`,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error login user",
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });

    return res.status(200).json({
        message: "Logout successfully"
    })
}