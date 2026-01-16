import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { useAppContext } from "../utils/Context";
import TableManifest from "../components/TableManifest";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserMain() {
    const { isModalOpen, manageModal, user } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        
        if (!user || !user.nome) {
            navigate("/loginForm");
        }
    }, [user, navigate]);

    if (!user || !user.nome) {
        return null; 
    }

    return (
        <div className="userMain">
            <Header>
                <h2>{user.nome}</h2>
            </Header>
            <main>
                <div>
                    <h2>Minhas manifestações</h2>
                    <button onClick={manageModal}>Nova manifestação</button>
                </div>
                <TableManifest classUser={"usuario"} id={user.id} />
            </main>
            {isModalOpen && <Modal />}
            <Footer/>
        </div>
    );
}

export default UserMain;