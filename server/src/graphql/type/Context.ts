import { Request, Response } from "express";
import PayloadInf from "./Payload";

export default interface ContextInf{
    req: Request,
    res: Response,
    payload?: PayloadInf
}