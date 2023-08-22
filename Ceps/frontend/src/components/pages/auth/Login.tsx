import styles from './Login.module.css';
import {useState} from 'react';

function Login() {
    interface User {
        name:string
        email:string
        password:string
    }
    const [user,setUser] = useState<User | {}>({})
    const [eyePassword,setEyePassword] = useState<boolean>(false);
    const [eyeConfirmPassword,setEyeConfirmPassword] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const onHandleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    console.log(user);
  return (
    <section className={styles.section}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nome</label>
                <input type="text" name="name" placeholder="Digite um nome" onChange={onHandleChange}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Digite um email" onChange={onHandleChange}/>
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <input type={eyePassword ? 'text' : 'password'} name="password" placeholder="Digite uma senha" onChange={onHandleChange}/>
                {eyePassword ? <i className="bi bi-eye" onClick={() => setEyePassword(!eyePassword)}></i> : 
                <i className="bi bi-eye-slash-fill" onClick={() => setEyePassword(!eyePassword)}></i>}
                
            </div>
            <div>
                <label htmlFor="confirmpassword">Confirmar Senha</label>
                <input type={eyeConfirmPassword ? 'text' : 'password'} name="confirmpassword" placeholder="Confirme a senha" onChange={onHandleChange}/>
                {eyeConfirmPassword ? 
                <i className="bi bi-eye" onClick={() => setEyeConfirmPassword(!eyeConfirmPassword)}></i> : 
                <i className="bi bi-eye-slash-fill" onClick={() => setEyeConfirmPassword(!eyeConfirmPassword)}></i>}
            </div>
            <div>
                <button type='submit'>Acessar</button>
            </div>
        </form>
    </section>
  )
}

export default Login