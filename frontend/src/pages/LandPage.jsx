import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function LandPage() {
    return (
        <div>
            <Header>
                <Link to="/loginForm">Login</Link>
                <Link to="/userForm">Create account</Link>
            </Header>
            <main>
                <h2>Sua voz, nossa prioridade</h2>
                <p>
                    Bem-vindo à plataforma de ouvidoria digital. 
                    Registre suas reclamações, sugestões, elogios ou denúncias de forma 
                    fácil e acompanhe todo o processo.
                </p>
                <Link to="/loginForm">Registrar manifestação</Link>
                <Link to="/adminForm">Cadastrar Instituição</Link>
            </main>
            <div className="homeList">
                <h2>Como funciona?</h2>
                <div>
                    <div>
                        <h3>Registre</h3>
                        <p>
                            Crie sua conta e descreva sua manifestação em detalhes. Você receberá um número de protocolo.
                        </p>
                    </div>
                    <div>
                        <h3>Acompanhe</h3>
                        <p>
                            Nossa equipe classifica e encaminha para o setor responsável. Você acompanha o status online.
                        </p>
                    </div>
                    <div>
                        <h3>Receba a Resposta</h3>
                        <p>
                            Receba a resposta final e avalie o atendimento prestado pela ouvidoria.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default LandPage;