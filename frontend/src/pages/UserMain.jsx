import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../utils/Context";

function UserMain() {
    const { isModalOpen, manageModal } = useAppContext();

    return (
        <div>
            <Header>
                <Link to="/userProfile">Pefil</Link>
            </Header>
            <main>
                <div>
                    <h2>Minhas manifestações</h2>
                    <button onClick={manageModal}>Nova manifestação</button>
                </div>
                <table>
                    <tr>
                        <th>Protocolo</th>
                        <th>Tipo</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </table>
            </main>
            {isModalOpen && <Modal />}
            <Footer/>
        </div>
    );
}

export default UserMain;