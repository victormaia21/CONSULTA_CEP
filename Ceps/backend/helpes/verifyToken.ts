import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import getToken from "./getToken";

export default function verifyToken(req:Request,res:Response,next:NextFunction) {
    if(!req.headers.authorization) {
        return res.status(422).json({message:"TOKEN INVALIDO"});
    }
    const token = getToken(req);

    if(!token) {
        return res.status(422).json({message:"TOKEN INVALIDO"});
    }

    next();
}