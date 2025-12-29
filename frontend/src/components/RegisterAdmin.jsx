import { validationEmail, validationPass } from "../utils/validations";
import { seePassword } from "../utils/seePass";

function RegisterAdmin({ cnpj }) {

     const showPass = (e) =>{
        e.preventDefault()
        const pass = "adminPassword"
        const confPass = "adminPasswordTwo"
        seePassword(pass,confPass)
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
            classe: "admin",
            cnpj: cnpj,
            nome: formData.get('adminName'),
            email: email,
            cpf: formData.get('adminCpf'),
            senha: passOne
        }
    }

    return (
        <div className="registerAdmin">
            <h2>Cadastro de usuário administrador Principal</h2>
            <form onSubmit={submitAdminUser}>
                <label htmlFor="adminName">Nome completo</label>
                <input type="text" name="adminName" id="adminName" placeholder="Seu nome completo" required />

                <label htmlFor="adminEmail">E-mail</label>
                <input type="email" name="adminEmail" id="adminEmail" placeholder="Seu melhor e-mail" required />

                <label htmlFor="adminCpf">CPF</label>
                <input type="number" name="adminCpf" id="adminCpf" placeholder="Seu CPF" required />

                <label htmlFor="adminPassword">Senha</label>
                <input type="password" name="adminPassword" id="adminPassword" placeholder="Crie uma senha" required />

                <label htmlFor="adminPasswordTwo">Confirme a senha</label>
                <input type="password" name="adminPasswordTwo" id="adminPasswordTwo" placeholder="Confirme sua senha" required />
                <button onClick={showPass}>Visualizar</button>

                <button type="submit">Cadastrar Usuário Administrador</button>
            </form>
        </div>
    )
}

export default RegisterAdmin;