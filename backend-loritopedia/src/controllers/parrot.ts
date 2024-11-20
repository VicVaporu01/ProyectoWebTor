import {Request, Response} from 'express';

export const getParrots = async (req: Request, res: Response) => {
    res.json({
        message: "Get Parrots"
    })
}