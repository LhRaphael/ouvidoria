import Header from "../components/Header";
import Footer from "../components/Footer";
import { validationPass, validationEmail, validationCNPJ} from "../utils/validations";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { seePassword } from "../utils/seePass";

function AdminForm() {
    const [nextStap, setNextStap] = useState(false);
    const navigate = useNavigate();

    const submitInstitution = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);

        const cnpj = formData.get("institutionCnpj")
        const validCnpj = validationCNPJ(cnpj)
        
        if(!validCnpj) {
            return alert("CNPJ inválido. Por favor isira um CNPJ válido")
        }

        const data = {
            institutionName: formData.get('institutionName'),
            institutionCnpj: cnpj,
            institutionSede: formData.get('institutionSede')
        }

        setNextStap(true);
    }

    const submitAdminUser = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const passOne = formData.get('adminPassword');
        const passTwo = formData.get('adminPasswordTwo');
        const email = formData.get('adminEmail');

        const validEmail = validationEmail(email);
        const validPass = validationPass(passOne, passTwo); 
        if (!validEmail) {
            return alert("E-mail inválido. Por favor, insira um e-mail válido.");
        }

        if (!validPass) {
            return alert("As senhas não coincidem ou não atendem aos requisitos.");
        }

        const data = {
            adminName: formData.get('adminName'),
            adminEmail: email,
            adminPassword: passOne
        }

        console.log("Instituição e usuário administrador principal cadastrados com sucesso:", data);
        navigate('/loginForm');
    }

    const showPass = (e) =>{
        e.preventDefault()
        const pass = "adminPassword"
        const confPass = "adminPasswordTwo"
        seePassword(pass,confPass)
    }

    return (
        <div>
            <Header/>
            <main>
                <h1>Cadastre sua Instituição</h1>
                <p>
                    Essa área é reservada para efetuar o cadastro de uma instituição, 
                    assim como seu usuário administrador princial
                </p>
                {!nextStap && (
                    <form onSubmit={submitInstitution}>
                        <label htmlFor="institutionName">Nome da Instituição</label>
                        <input type="text" name="institutionName" id="institutionName" placeholder="Nome da Instituição" required />

                        <label htmlFor="institutionCnpj">Cnpj da instituição</label>
                        <input type="number" name="institutionCnpj" id="institutionCnpj" placeholder="Cnpj da Instituição" required />

                        <label htmlFor="institutionSede">Sede da instituição</label>
                        <input type="text" name="institutionSede" id="institutionSede" required/>

                        <button type="submit">Prosseguir</button>
                    </form>   
                )}

                {nextStap && (
                    <div>
                        <h2>Cadastro de usuário administrador principal</h2>
                        <form onSubmit={submitAdminUser}>
                            <label htmlFor="adminName">Nome completo</label>
                            <input type="text" name="adminName" id="adminName" placeholder="Seu nome completo" required />

                            <label htmlFor="adminEmail">E-mail</label>
                            <input type="email" name="adminEmail" id="adminEmail" placeholder="Seu melhor e-mail" required />

                            <label htmlFor="adminPassword">Senha</label>
                            <input type="password" name="adminPassword" id="adminPassword" placeholder="Crie uma senha" required />

                            <label htmlFor="adminPasswordTwo">Confirme a senha</label>
                            <input type="password" name="adminPasswordTwo" id="adminPasswordTwo" placeholder="Confirme sua senha" required />
                            <button onClick={showPass}>Visualizar</button>

                            <button type="submit">Cadastrar Instituição</button>
                        </form>
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    )
}

export default AdminForm;