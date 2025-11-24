import Header from "../components/Header";
import Footer from "../components/Footer";
import { validationPass } from "../utils/validations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { seePassword } from "../utils/seePass";

function ChangePass() {
    const [codeSignal, setCodeSignal] = useState(false);
    const [codeInserted, setCodeInserted] = useState("");
    const [passwordSignal, setPasswordSignal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const insertCodeSignal = (e) => {
        e.preventDefault();
        setCodeSignal(true);
    }

    const insertCode = (e) =>{
        e.preventDefault();
        if(e.target.value.length === 6){
            console.log("Código inserido com sucesso")
            setCodeSignal(false);
            setPasswordSignal(true);
        }
        else{
            setCodeInserted(e.target.value)
        }
    }

    const inserPassword = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const passOne = formData.get('newPassword');
        const passTwo = formData.get('newPasswordConfirme');

        const validPass = validationPass(passOne, passTwo);
        
        if (validPass) {
            console.log("Senha alterada com sucesso");
            navigate('/loginForm');
        } else {
            alert("As senhas não coincidem ou não atendem aos requisitos.");
        }

    }

    const showPass = (e) =>{
        e.preventDefault()
        const pass = "newPassword"
        const confPass = "newPasswordConfirme"
        seePassword(pass,confPass)
    }

    return (
        <div>
            <Header />
            <main>
                <h2>Alterar senha</h2>
                <form>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Seu melhor e-mail" required />
                    <button onClick={insertCodeSignal}>Obter código</button>
                </form>
                {codeSignal && (
                    <div>
                        <label htmlFor="code">Código</label>
                        <input type="text" name="code" id="code" placeholder="Insira o código recebido por e-mail" required onChange={insertCode}/>
                    </div>
                )}
                
                {passwordSignal && (
                    <form onSubmit={inserPassword}>
                        <h3>As senhas precisam no minímo de:</h3>
                        <ul>
                            <li>8 caracteres</li>
                            <li>Uma letra maiúscula</li>
                            <li>Uma letra minúscula</li>
                            <li>Um número</li>
                            <li>Um caractere especial</li>
                        </ul>
                        <label htmlFor="newPassword">Nova Senha</label>
                        <input type="password" name="newPassword" id="newPassword" placeholder="Digite sua nova senha" required />

                        <label htmlFor="newPasswordConfirme">Confirme a nova senha</label>
                        <input type="password" name="newPasswordConfirme" id="newPasswordConfirme" placeholder="Confirme sua nova senha" required />
                        
                        <button onClick={showPass}>Visualizar</button>
                        <button type="submit">Alterar senha</button>
                    </form>
                )}
                
            </main>
            <Footer />
        </div>
    );
}

export default ChangePass;