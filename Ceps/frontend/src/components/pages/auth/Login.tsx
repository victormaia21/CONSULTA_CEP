import "./Login.module.css";
import {useState} from 'react';

function Login() {
    interface User {
        name:string
        email:string
        password:string
    }
    const [user,setUser] = useState<User | {}>({})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const onHandleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    console.log(user);
  return (
    <section>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nome</label>
                <input type="text" name="name" placeholder="Digite um nome" onChange={onHandleChange}/>
            </div>
        </form>
    </section>
  )
}

export default Login