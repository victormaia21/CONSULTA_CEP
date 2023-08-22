import api from "../utils/api";
import useFlashMessage from "./useFlashMessage";
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

    function useAuth() {

    const {setFlashMessage} = useFlashMessage();
    const [authenticated,setAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token : string | null = localStorage.getItem('token');
        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true);
        }
    })
    interface Data {
        token:string,
        message:string
    }
    interface User {
        name:string,
        email:string,
        password:string,
        confirmpassword:string
    }

    async function register(user : User) {

        try {
             const data  : Data = await api.post('/users/register').then((response) => {
                return response.data;
             })
             auth(data);
             setFlashMessage(data.message,'success')
        } catch(err : any) {
            setFlashMessage(err.response.data.message,'erro')
        }
    }

    function auth(data : Data) {
        localStorage.setItem('token',JSON.stringify(data.token));
        setAuthenticated(true);
        navigate('/');
    }
    
    return {register,authenticated}
}

export default useAuth