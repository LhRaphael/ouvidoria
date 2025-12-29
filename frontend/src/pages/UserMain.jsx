import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../utils/Context";
import TableManifest from "../components/TableManifest";
function UserMain() {
    const { isModalOpen, manageModal, user } = useAppContext();

    return (
        <div className="userMain">
            <Header>
                <Link to="/userProfile">Pefil</Link>
            </Header>
            <main>
                <div>
                    <h2>Minhas manifestações</h2>
                    <button onClick={manageModal}>Nova manifestação</button>
                </div>
                <TableManifest classUser={"user"} id={user.cpf} />
            </main>
            {isModalOpen && <Modal />}
            <Footer/>
        </div>
    );
}

export default UserMain;