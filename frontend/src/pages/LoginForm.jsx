import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/Context";

function LoginForm() {
    const navigate = useNavigate()
    const { setUser } = useAppContext()

    const showPass = (e)=>{
        e.preventDefault()

        const pass = document.getElementById("password")
        if(pass.type == "text") pass.type = "password"
        else pass.type = "text"
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })

        try{
            const userData = await response.json()
            console.log(userData)
            setUser(userData)
            navigate(`/${userData.class}Page`)
        }catch(err){
            return alert("Erro ao fazer login. Verifique suas credenciais."+err)
        }

    }

    return (
        <div className="loginForm">
            <Header />
            <main>
                <h2>Acesse sua conta</h2>
                <span>ainda não possui uma conta? <Link to="/userForm">Criar conta</Link></span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Seu melhor e-mail" required />

                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Digite sua senha" required />

                    <button onClick={showPass}>visualizar</button>
                    <button type="submit">Entrar</button>
                </form>
                <Link to="/changePass">Esqueci minha senha</Link>
            </main>
            <Footer />
        </div>
    )
}

export default LoginForm;