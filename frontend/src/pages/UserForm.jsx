import Header from "../components/Header";
import Footer from "../components/Footer";
import { validationEmail, validationPass, validationCPF} from "../utils/validations";
import { seePassword } from "../utils/seePass";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserForm() {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const navigate = useNavigate()

    const localData = (event)=>{
        setLoading(true);
        event.target.value = "Localizando..."
        navigator.geolocation.getCurrentPosition(async (position)=>{
            const {latitude, longitude} = position.coords;

            const apiKey = "747419face034afea9c73539b6069f75"
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`

            const response = await fetch(url);
            const data = await response.json()
            const address = data.results[0].components;

            const locateData = {
                pais: address.country,
                estado: address.state,
                cidade: address.city || address.town || address.village,
            }

            setLoading(false);
            setLocation(locateData)
            console.log(location);

            const value = `${locateData.pais}, ${locateData.estado}, ${locateData.cidade}`
            event.target.value = value
        });
        
    }
    const createUser = (e) =>{
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const passOne = formData.get('password');
        const passTwo = formData.get('confirmPassword');
        const cpf = formData.get('cpf');
        const email = formData.get('email');

        const validEmail = validationEmail(email);
        const validCPF = validationCPF(cpf);
        const validPass = validationPass(passOne, passTwo);

        if (!validEmail) {
            return alert("E-mail inválido. Por favor, insira um e-mail válido.");
        }

        if (!validPass) {
            return alert("As senhas não coincidem ou não atendem aos requisitos.");
        }

        if (!validCPF) {
            return alert("CPF inválido. Por favor, insira um CPF válido.");
        }
        
        const data = {
            classe: "user",
            nome: formData.get('name'),
            cpf: formData.get('cpf'),
            email: email,
            telefone: formData.get('telefone'),
            nascimento: formData.get('nascimento'),
            endereco: formData.get('endereco'),
            senha: passOne
        }
        console.log("Usuário criado com sucesso:", data);
        navigate("/loginForm")
    }

    const showPass = (e)=>{
        e.preventDefault();
        const pass = "password"
        const confPass = "confirmPassword"

        seePassword(pass,confPass)
        
    }

    return (
        <div className="userForm">
            <Header />
            <main>
                <h2>Crie sua conta</h2>
                <span>já possui uma conta? <Link to="/loginForm">Entre aqui</Link></span>
                <form onSubmit={createUser}>
                    <div>    
                        <label htmlFor="name">Nome completo</label>
                        <input type="text" name="name" id="name" placeholder="Seu nome completo" required />
                    </div>

                    <div>
    
                        <label htmlFor="cpf">Cpf (apenas números)</label>
                        <input type="number" name="cpf" id="cpf" placeholder="Seu cpf" required />
                    </div>  

                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="Seu melhor e-mail" required />
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone</label>
                        <input type="tel" name="telefone" id="telefone" placeholder="(XX) XXXXX-XXXX" required />
                    </div>

                    <div>
                        <label htmlFor="nascimento">Data de nascimento</label>
                        <input type="date" name="nascimento" id="nascimento" required />
                    </div>

                    <div>
                        <label htmlFor="endereco">Endereço atual</label>
                        <input type="text" name="endereco" id="endereco" placeholder="Seu endereço completo" required onClick={localData}/>
                    </div>

                    <div>
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" placeholder="Crie uma senha" required />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirme sua senha</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirme sua senha" required />
                        <button onClick={showPass}>visualizar</button>
                    </div>

                    <button type="submit">Cadastrar</button>
                </form>
            </main>
            <aside>
                <h3>As senhas precisam no minímo de:</h3>
                <ul>
                    <li>8 caracteres</li>
                    <li>Uma letra maiúscula</li>
                    <li>Uma letra minúscula</li>
                    <li>Um número</li>
                    <li>Um caractere especial</li>
                </ul>   
            </aside>
            <Footer />
        </div>
    );
}
export default UserForm;