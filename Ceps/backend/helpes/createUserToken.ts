import { Request, Response } from 'express';
import {sign} from 'jsonwebtoken';
import { Iuser } from '../models/User';

export default function createUserToken(user : Iuser,req:Request,res:Response) {
    const token = sign({
        name:user.name,
        id:user._id
    },"nossosecret");

    res.status(201).json({
        message:"Usuario autenticado com sucesso",
        token:token,
        id:user._id
    })
}