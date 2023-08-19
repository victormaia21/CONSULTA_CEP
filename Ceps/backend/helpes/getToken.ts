import { Request } from "express";

export default function getToken(req:Request) {
    const tokenBearer = req.headers.authorization;
    const token = tokenBearer?.split(' ')[1];
    return token;
}