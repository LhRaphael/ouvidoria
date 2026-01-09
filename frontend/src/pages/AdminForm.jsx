import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterAdmin from "../components/RegisterAdmin";
import { validationCNPJ} from "../utils/validations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminForm() {
    const [nextStap, setNextStap] = useState(false);
    const navigate = useNavigate();
    const [cnpj, setCnpj] = useState(0);

    const submitInstitution = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);

        const cnpj = formData.get("institutionCnpj")
        const validCnpj = validationCNPJ(cnpj)
        
        if(!validCnpj) {
            return alert("CNPJ inválido. Por favor isira um CNPJ válido")
        }
        setCnpj(cnpj);

        const data = {
            nome: formData.get('institutionName'),
            cnpj: cnpj,
            sede: formData.get('institutionSede'),
        }

        const response = await fetch("http://localhost:3001/instituicoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(response);

        if(!response.ok) {
            alert("Erro ao cadastrar instituição. Tente novamente.")
            return navigate("/adminform");
        }

        setNextStap(true);
    }

    return (
        <div className="adminForm">
            <Header/>
            <main>
                <h1>Informe sua Instituição</h1>
                <p>
                    Essa área é reservada para efetuar o cadastro de uma instituição, 
                    assim como seu usuário administrador princial
                </p>
                {!nextStap && (
                    <form onSubmit={submitInstitution}>
                        <div>
                            <label htmlFor="institutionName">Nome da Instituição</label>
                            <input type="text" name="institutionName" id="institutionName" placeholder="Nome da Instituição" required />
                        </div>

                        <div>
                            <label htmlFor="institutionCnpj">Cnpj da instituição</label>
                            <input type="number" name="institutionCnpj" id="institutionCnpj" placeholder="Cnpj da Instituição" required />
                        </div>

                        <div>
                            <label htmlFor="institutionSede">Sede da instituição</label>
                            <input type="text" name="institutionSede" id="institutionSede" required/>
                        </div>

                        <button type="submit">Prosseguir</button>
                    </form>   
                )}

                {nextStap && (<RegisterAdmin cnpj={cnpj}/>)}
            </main>
            <Footer/>
        </div>
    )
}

export default AdminForm;