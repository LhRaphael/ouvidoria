import { useState } from "react";

import { useAppContext } from "../utils/Context";

function SettingsAdmin() {

    return (
        <div>
            <h2>Configurações</h2>
            <div>
                <h3>Perfil</h3>
                <p>Editar informações do perfil institucional</p>
                <div>
                    <img src="" alt="Imagem de perfil" />
                    <button>Alterar imagem</button>
                </div>
                <div>
                    <label htmlFor="adminName">Nome:</label>
                    <input type="text" name="adminName" id="adminName" placeholder="Nome do administrador" />
                </div>
            </div>
            <div>
                <h3>Relatórios</h3>
                {/* implementar configurações para geração de relatórios */}
            </div>
            <div>
                <h3>Funcionários</h3>
                <div>
                    <h4>Aceitação de Funcionários</h4>
                    <ul>
                        {/* listar funcionários pendentes de aceitação */}
                    </ul>
                </div>
                <div>
                    <h4>Gerenciar Funcionários</h4>
                    <ul>
                        {/* listar funcionários ativos para gerenciar */}
                    </ul>
                </div>
            </div>
            <div>
                <button>Sair</button>
                <button>Excluir Conta</button>
            </div>
        </div>
    )
}

export default SettingsAdmin;