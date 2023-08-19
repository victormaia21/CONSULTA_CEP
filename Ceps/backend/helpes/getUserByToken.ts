import { Iuser } from '../models/User';
import {verify} from 'jsonwebtoken';
import { User } from "../models/User";


type JwtPayload = {
    id:number
}


export default async function getUserByToken(token : (string | undefined))  {
    
    if(token) {
        const {id}  = verify(token,'nossosecret') as JwtPayload;
        
        const user  = await User.findById(id).select('-password') as Iuser;
        
        return user;
        
    }
    
}