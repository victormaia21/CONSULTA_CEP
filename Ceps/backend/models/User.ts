import conn from '../db/conn';
import { Schema, Types } from 'mongoose';

interface Iuser {
    _id:Types.ObjectId
    name:string,
    email:string,
    password:string,
    photo?:string
}

const User = conn.model(
    'User',
    new Schema<Iuser>({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        photo:{
            type:String
        }
    })
)

export {User,Iuser};