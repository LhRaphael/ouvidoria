import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router-dom";

function LoginForm() {
    const showPass = (e)=>{
        e.preventDefault()

        const pass = document.getElementById("password")
        if(pass.type == "text") pass.type = "password"
        else pass.type = "text"
    }

    return (
        <div>
            <Header />
            <main>
                <h2>Acesse sua conta</h2>
                <span>ainda não possui uma conta? <Link to="/userForm">Criar conta</Link></span>
                <form>
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