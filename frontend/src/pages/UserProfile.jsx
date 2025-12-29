import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function UserProfile() {
  const [nameSignal, setNameSignal] = useState(false);

  return (
    <div className="userProfile">
      <Header />
      <h2>Perfil</h2>
      <p>Detalhes do usuário serão exibidos aqui.</p>
      <div>
        <img src="" alt="Imagem de perfil" />
        <button>Alterar imagem</button>
      </div>
      <div>
        <h3>Nome do usuário</h3>
        {nameSignal ? (
          <form>
            <input type="text" placeholder="Novo nome" />
            <button>Salvar</button>
            <button onClick={() => setNameSignal(false)}>Cancelar</button>
          </form>
        ) : (
          <button onClick={() => setNameSignal(true)}>Editar nome</button>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;