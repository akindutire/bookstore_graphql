import { NextFunction, Request, Response } from "express";

export const guard = (req: Request, res: Response, next: NextFunction) => {

    next()
}