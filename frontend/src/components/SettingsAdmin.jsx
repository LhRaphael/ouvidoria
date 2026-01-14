import { useEffect, useState } from "react";

import { useAppContext } from "../utils/Context";

function SettingsAdmin() {
    const { user } = useAppContext();
    const [funcionarios, setFuncionarios] = useState([]);
    const [pedidos, setPedidos] = useState([])

    const fetchFuncionarios = async () => {
        try {
            const response = await fetch(`http://localhost:3001/admins/cnpj/${user.cnpj}`);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            const data = await response.json();
            setFuncionarios(data);
        } catch (err) {
            console.error("Erro ao buscar funcionários:", err);
            setFuncionarios([]);
        }
    }

    const rejeitarFuncionario = async (cpf) =>{
        try{
            const response = await fetch(`http://localhost:3001/pedidos/${cpf}`, {method:'DELETE',})
            if(!response.ok) throw new Error(`${response.status}`)
            else alert("Funcionário excluido")
            fetchFuncionariosPendentes()
        }
        catch(err){
            console.error("Erro ao deletar pedido")
        }
    }

    const aceitarFuncionario = async (cpf) =>{
        try{
            const response = await fetch(`http://localhost:3001/pedidos/${cpf}`, {method:'DELETE',})
            if(!response.ok) throw new Error(`${response.status} ${response.statusText}`)
            else alert("Funcionário aceito")
            fetchFuncionariosPendentes()
        }
        catch(err){
            console.error("Erro ao aceitar funcionário"+ err)
        }
    }

    const fetchFuncionariosPendentes = async () => {
        try {
            const response = await fetch(`http://localhost:3001/pedidos/simples/cnpj/${user.cnpj}`);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            const data = await response.json();
            console.log(data)
            setPedidos(data)
        } catch (err) {
            console.error("Erro ao buscar funcionários pendentes:", err);
        }   
    }

    useEffect(() => {
        fetchFuncionarios();
        fetchFuncionariosPendentes()
    }, []);

    return (
        <div className="settingsAdmin">
            <h2>Configurações</h2>
            <div>
                <h3>Perfil</h3>
                <p>Editar informações do perfil institucional</p>
                <div>
                    <img src="#" alt="Imagem de perfil" />
                    <button>Alterar imagem</button>
                </div>
                <div>
                    <label htmlFor="adminName">Nome:</label>
                    <input type="text" name="adminName" id="adminName" placeholder="Nome do administrador" />
                </div>
            </div>
            <div>
                <h3>Funcionários</h3>
                <div>
                    <h4>Aceitação de Funcionários</h4>
                    <ul>
                        {pedidos.map((f, index) => (
                            <li key={index}>{f.nome} - {f.email} - {f.cpf} <button onClick={()=>aceitarFuncionario(f.cpf)}>Aceitar</button> <button>Recusar</button></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Gerenciar Funcionários</h4>
                    <ul>
                        {funcionarios.map((f, index) => (
                            <li key={index}>{f.nome} - {f.email} - {f.cargo}</li>
                        ))}
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