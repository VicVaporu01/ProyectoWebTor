import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {token} = req.cookies;

        if (!token) return res.status(401).json({message: "No autorizado."});

        jwt.verify(token, process.env.SECRET_KEY || "SECRET_KEY", (error: any, user: any) => {
            if (error) return res.status(401).json({message: "No autorizado."});

            req.user = user;

            next();
        });
    } catch (error) {
        res.status(500).json({message: "Error en el servidor."});
    }
}