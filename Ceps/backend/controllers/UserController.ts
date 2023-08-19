import { Request,Response } from "express";
import {User,Iuser} from "../models/User";
import {compare, genSalt,hash} from 'bcrypt';
import createUserToken from "../helpes/createUserToken";
import jwt,{ decode } from "jsonwebtoken";
import getToken from "../helpes/getToken";
import getUserByToken from "../helpes/getUserByToken";

export default class UserController {
    
    static async registerUser(req:Request,res:Response) {
        const {name,email,password,confirmpassword} = req.body;

        if(!name) {
            return res.status(422).json({message:"Nome obrigatorio"});
        }
        if(!email) {
            return res.status(422).json({message:"Email obrigatorio"})
        }
        const emailExist = await User.findOne({email:email});

        if(emailExist) {
            return res.status(422).json({message:"Email já existente, use outro"});
        }
        if(!password) {
            return res.status(422).json({message:"Senha obrigatoria"});
        }
        if(!confirmpassword) {
            return res.status(422).json({message:"Confirmação de senha obrigatoria"})
        }
        if(password !== confirmpassword) {
            return res.status(422).json({message:"As senhas precisam está iguais"});
        }
        const salt = await genSalt(12);
        const hashPassword = await hash(password,salt);

        try {
            const user : Iuser = await User.create({name,email,password:hashPassword});
            createUserToken(user,req,res);
        } catch(err:any) {
            console.log(err)
        }
    }

    static async login(req:Request,res:Response) {
        const {email,password} = req.body

        if(!email) {
            return res.status(422).json({message:"Email obrigatorio"});
        }
        if(!password) {
            return res.status(422).json({message:"Senha obrigatoria"});
        }

        const emailIsValid = await User.findOne({email:email}) as Iuser;

        if(!emailIsValid) {
            return res.status(422).json({message:"Email invalido"});
        }

        const passwordIsValid : boolean = await compare(password,emailIsValid.password);

        if(!passwordIsValid) {
            return res.status(422).json({message:"Senha invalida"});
        }

        try {
            createUserToken(emailIsValid,req,res);
        } catch(err) {
            res.status(500).json({message:"Erro de servidor"});
        }
    }

    static async myUser(req:Request,res:Response) {
        let user;

        if(req.headers.authorization) {
            const token : string | undefined = getToken(req);
            user = await getUserByToken(token) as Iuser;
        }

        res.status(200).json({user});
    }

    static async updateUser(req:Request,res:Response) {
        const {name,email,password,confirmpassword} = req.body;
        let photo;
        if(req.file) {
            photo = req.file.filename;
        }
        const token : string | undefined = getToken(req);
        const user = await getUserByToken(token) as Iuser;
        
        if(!name) {
            return res.status(422).json({message:"Nome obrigatorio"});
        }
        if(!email) {
            return res.status(422).json({message:"Email obrigatorio"});
        }
        const emailExist = await User.findOne({email:email});

        if(email !== user.email && emailExist) {
            return res.status(422).json({message:"já existe um usuario utilizando este email, por favor digite novamente"});
        }

        if(!password) {
            return res.status(422).json({message:"Senha obrigatoria"});
        }

        if(!confirmpassword) {
            return res.status(422).json({message:"Confirmação de senha obrigatoria"});
        }

        if(confirmpassword !== password) {
            return res.status(422).json({message:"As senhas precisam está iguais"});
        }

        const salt : string = await genSalt(12);
        const hashPassword : string = await hash(password,salt);
        try {
            const userUpdate = await User.findOneAndUpdate({_id:user._id},{
                name,
                email,
                password:hashPassword,
                photo
            },{new:true}) as Iuser;
            res.status(200).json({message:`Usuario ${userUpdate.name} atualizado com sucesso`,userUpdate});
        } catch(err : any) {
            res.status(500).json({message:"Erro de servidor"})
        }
    }

    static async deleteUser(req:Request,res:Response) {
        const token : string | undefined = getToken(req);
        const user = await getUserByToken(token) as Iuser;

        try {
            const userDelete = await User.findOneAndDelete({_id:user._id}) as Iuser;
            res.status(200).json({messge:`Usuario ${userDelete.name} deletado com sucesso`});
        } catch(err : any) {
            res.status(500).json({message:"Erro de servidor"});
        }
    }
}