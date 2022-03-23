import { Request, Response } from "express";

export default interface ContextInf{
    req: Request,
    res: Response,
    payload?: {email: string}
}