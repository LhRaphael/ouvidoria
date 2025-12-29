import { useState } from "react";

function UserProfile() {
  const [nameSignal, setNameSignal] = useState(false);


  return (
    <div>
      <h2>Perfil</h2>
      <p>Detalhes do usuário serão exibidos aqui.</p>
      <div>
        <img src="" alt="Imagem de perfil" />
        <button>Alterar imagem</button>
      </div>
      <div>
        <h2>Nome do usuário</h2>
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
    </div>
  );
}

export default UserProfile;