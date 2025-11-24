import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function UserMain() {
  return (
    <div>
        <Header>
            <Link to="/userProfile">Pefil</Link>
        </Header>
        <main>
            <div>
                <h2>Minhas manifestações</h2>
                <button>Nova manifestação</button>
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
        <Footer/>
    </div>
  );
}

export default UserMain;