import { useEffect, useState } from "react";
import { useAppContext } from "../utils/Context"; 

function SettingsAdmin() {
    const { user, setUser } = useAppContext(); // Assumindo que setUser existe para fazer logout
    const [funcionarios, setFuncionarios] = useState([]);
    const [pedidos, setPedidos] = useState([]);

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

    const fetchFuncionariosPendentes = async () => {
        try {
            const response = await fetch(`http://localhost:3001/pedidos/simples/cnpj/${user.cnpj}`);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            const data = await response.json();
            setPedidos(data);
        } catch (err) {
            console.error("Erro ao buscar funcionários pendentes:", err);
        }   
    }

    const rejeitarFuncionario = async (cpf) =>{
        try{
            const response = await fetch(`http://localhost:3001/admins/${cpf}`, {method:'DELETE'})
            if(!response.ok) throw new Error(`${response.status}`)
            else alert("Solicitação recusada")
            fetchFuncionariosPendentes()
        }
        catch(err){
            console.error("Erro ao rejeitar pedido", err)
        }
    }

    const aceitarFuncionario = async (cpf) =>{
        try{
            const response = await fetch(`http://localhost:3001/pedidos/${cpf}`, {method:'DELETE'})
            if(!response.ok) throw new Error(`${response.status} ${response.statusText}`)
            else alert("Funcionário aceito")
            fetchFuncionariosPendentes()
            fetchFuncionarios() // Atualiza a lista de funcionários ativos também
        }
        catch(err){
            console.error("Erro ao aceitar funcionário"+ err)
        }
    }

    const sair = () =>{
        window.location.href = "/"
    }

    // 1. Atualizar Cargo
    const atualizarCargo = async (id, cargoAtual) => {

        const novoCargo = prompt("Digite o novo cargo para o funcionário:", cargoAtual);

        if (novoCargo !== null && novoCargo !== cargoAtual && novoCargo.trim() !== "") {
            try {
                const response = await fetch(`http://localhost:3001/admins/`, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, cargo: novoCargo })
                });

                if (!response.ok) throw new Error(`${response.status}`);
                
                alert("Cargo atualizado com sucesso!");
                fetchFuncionarios(); // Recarrega a lista para mostrar a mudança
            } catch (err) {
                console.error("Erro ao atualizar cargo:", err);
                alert("Erro ao atualizar o cargo.");
            }
        }
    }

    const excluirConta = async () => {
        const confirmacao = window.confirm("Tem certeza que deseja EXCLUIR sua conta? Esta ação é irreversível.");

        if (confirmacao) {
            try {
                const identificador = user.cpf || user.id; 
                
                const response = await fetch(`http://localhost:3001/admins/${identificador}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error(`${response.status}`);

                alert("Conta excluída com sucesso.");
                
                // Lógica de Logout
                if(setUser) setUser(null); // Limpa o contexto
                // navigate('/login'); // Redireciona para login (se usar router)
                window.location.href = "/"; // Força recarregamento para a home/login
                
            } catch (err) {
                console.error("Erro ao excluir conta:", err);
                alert("Não foi possível excluir a conta.");
            }
        }
    }

    useEffect(() => {
        fetchFuncionarios();
        fetchFuncionariosPendentes()
    }, []);

    return (
        <div className="settingsAdmin">
            <h2>Configurações</h2>
            
            <div className="section-funcionarios">
                <h3>Funcionários</h3>
                
                <div>
                    <h4>Aceitação de Funcionários</h4>
                    {pedidos.length === 0 ? <p>Nenhum pedido pendente.</p> : (
                        <ul>
                            {pedidos.map((f, index) => (
                                <li key={index}>
                                    {f.nome} - {f.email} - {f.cpf} 
                                    <button onClick={()=>aceitarFuncionario(f.cpf)}>Aceitar</button> 
                                    <button onClick={()=>rejeitarFuncionario(f.cpf)}>Recusar</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <h4>Gerenciar Funcionários</h4>
                    {funcionarios.length === 0 ? <p>Nenhum funcionário cadastrado.</p> : (
                        <ul>
                            {funcionarios.map((f, index) => (
                                <li key={index} style={{marginBottom: '10px'}}>
                                    <span>{f.nome} - {f.email} - <strong>{f.cargo}</strong> </span>
                                    {/* Botão para atualizar o cargo */}
                                    <button onClick={() => atualizarCargo(f.id, f.cargo)}>
                                        Alterar Cargo
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="section-actions" style={{marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px'}}>
                <button onClick={sair}>Sair</button>
                
                {/* Botão de Excluir com estilo de perigo (opcional) */}
                <button onClick={excluirConta}>Excluir Conta</button>
            </div>
        </div>
    )
}

export default SettingsAdmin;