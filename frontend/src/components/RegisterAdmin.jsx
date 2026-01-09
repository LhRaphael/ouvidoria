import { validationEmail, validationPass } from "../utils/validations";
import { seePassword } from "../utils/seePass";
import { useNavigate } from "react-router-dom";

function RegisterAdmin({ cnpj }) {
    const navigate = useNavigate();

     const showPass = (e) =>{
        e.preventDefault()
        const pass = "adminPassword"
        const confPass = "adminPasswordTwo"
        seePassword(pass)
        seePassword(confPass)
    }

    const submitAdminUser = async (event) => {
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
           nome: formData.get('adminName'),
           cpf: formData.get('adminCpf'),
           email: formData.get('adminEmail'),
           senha: formData.get('adminPassword'),
           cargo: 'Administrador Principal',
           instituicaoCnpj: cnpj
        }

        const response = await fetch('http://localhost:3001/admins/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(response);

        if (!response.ok) {
            return alert("Erro ao cadastrar administrador. Tente novamente.");
        }

        alert("Administrador cadastrado com sucesso!");
        navigate('/loginForm');
    }

    return (
        <div className="registerAdmin">
            <h2>Cadastro de usuário administrador Principal</h2>
            <form onSubmit={submitAdminUser}>
                <div>
                    <label htmlFor="adminName">Nome completo</label>
                    <input type="text" name="adminName" id="adminName" placeholder="Seu nome completo" required />
                </div>

                <div>
                    <label htmlFor="adminEmail">E-mail</label>
                    <input type="email" name="adminEmail" id="adminEmail" placeholder="Seu melhor e-mail" required />
                </div>

                <div>
                    <label htmlFor="adminCpf">CPF</label>
                    <input type="number" name="adminCpf" id="adminCpf" placeholder="Seu CPF" required />
                </div>      

                <div>
                    <label htmlFor="adminPassword">Senha</label>
                    <input type="password" name="adminPassword" id="adminPassword" placeholder="Crie uma senha" required />
                </div>

                <div>
                    <label htmlFor="adminPasswordTwo">Confirme a senha</label>
                    <input type="password" name="adminPasswordTwo" id="adminPasswordTwo" placeholder="Confirme sua senha" required />
                    <button onClick={showPass}>Visualizar</button>
                </div>

                <button type="submit">Cadastrar Usuário Administrador</button>
            </form>
        </div>
    )
}

export default RegisterAdmin;