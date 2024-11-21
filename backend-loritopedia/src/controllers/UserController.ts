import {Request, Response} from "express";

export const newUser = (req: Request, res: Response) => {
    const newUser = req.body;

    res.json({
        message: "Create User",
        body: newUser
    })
}

export const login = (req: Request, res: Response) => {
    const loginUser = req.body;

    res.json({
        message: "Login user",
        body: loginUser
    });
}