import { createContext } from "react";
import useAuth from "../hooks/useAuth";

interface CardProps {
    children:React.ReactNode
}


const {authenticated,register} = useAuth();
const context = createContext({authenticated,register});

const UserProvider:React.FC<CardProps> = ({children}) => {
    return (
        <context.Provider value={{authenticated,register}}>{children}</context.Provider>
    )
}

export {UserProvider,context}