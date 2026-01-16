import { useState, useEffect } from "react";
import { useAppContext } from "../utils/Context";
import { ModalDetalhes } from "./ModalDetalhes";

function TableManifest({ classUser, id, filter }) {
    // Estados de dados
    const [manifests, setManifests] = useState([]);
    const [filteredManifests, setFilteredManifests] = useState([]);
    
    // Estados de controle de UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalDetalhes, setModalDetalhes] = useState(false);
    const [manifestId, setManifestId] = useState(null);

    // Contexto
    const { reloadManifestacoes, setReloadManifestacoes } = useAppContext();

    // Opções de Status para Admin
    const statusOptions = ["Pendente", "Em Análise", "Em Andamento", "Concluído", "Cancelado"];

    // --- Buscas (GET) ---
    const fetchManifests = async () => {
        setLoading(true);
        setError(null);
        try {
            // Garante que classUser e id existam antes de buscar
            if (!classUser || !id) return;

            const response = await fetch(`http://localhost:3001/manifestacoes/${classUser}/${id}`);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            
            const data = await response.json();
            const listaSegura = Array.isArray(data) ? data : [];
            
            setManifests(listaSegura);
            // A filtragem será aplicada pelo useEffect dependente de [manifests]
        } catch (err) {
            console.error("Erro ao buscar manifestações:", err);
            setError(err.message || "Erro desconhecido");
            setManifests([]);
            setFilteredManifests([]);
        } finally {
            setLoading(false);
        }
    }

    // --- Ações de Admin (PUT) ---
    const handleStatusChange = async (manifestId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3001/manifestacoes/`, {
                method: 'PUT', // ou PATCH, dependendo da sua API
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: manifestId, status: newStatus })
            });

            if (!response.ok) throw new Error("Falha ao atualizar status");

            alert(`Status atualizado para: ${newStatus}`);
            fetchManifests(); // Recarrega a lista para refletir a mudança
        } catch (err) {
            console.error("Erro ao atualizar status:", err);
            alert("Erro ao atualizar o status da manifestação.");
        }
    };

    // --- Ações de Usuário (DELETE) ---
    const handleExcluir = async (manifestId) => {
        const confirmar = window.confirm("Tem certeza que deseja cancelar/excluir esta manifestação?");
        if (!confirmar) return;

        try {
            const response = await fetch(`http://localhost:3001/manifestacoes/${manifestId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error("Falha ao excluir manifestação");

            alert("Manifestação excluída com sucesso.");
            fetchManifests(); // Recarrega a lista
        } catch (err) {
            console.error("Erro ao excluir:", err);
            alert("Erro ao tentar excluir a manifestação.");
        }
    };

    // --- Lógica de Filtro ---
    const filterManifests = () => {
        if (!manifests.length) {
            setFilteredManifests([]);
            return;
        }

        const { pesquisaGeral = "", data = "", tipo = "", status = {} } = filter || {};
        const activeStatusKeys = Object.keys(status).filter(k => status[k]);

        // Função auxiliar para remover acentos e caixa alta
        const normalize = (s) => {
            if (!s && s !== 0) return "";
            return String(s)
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '') // Remove acentos
                .replace(/[^a-z0-9]/g, ''); // Remove caracteres especiais
        }

        const result = manifests.filter((m) => {
            // 1. Pesquisa Geral
            if (pesquisaGeral && pesquisaGeral.trim() !== "") {
                const hay = Object.values(m)
                    .map(v => (typeof v === 'string' || typeof v === 'number') ? String(v) : '')
                    .join(' ')
                    .toLowerCase();
                if (!hay.includes(pesquisaGeral.toLowerCase())) return false;
            }

            // 2. Filtro por Data (YYYY-MM-DD)
            if (data && data !== "") {
                const rawDate = m.criado || m.date || m.createdAt || m.created_at || null;
                if (!rawDate) return false;
                // Ajuste para pegar a data local corretamente ou UTC dependendo da API
                const dateOnly = new Date(rawDate).toISOString().slice(0, 10);
                if (dateOnly !== data) return false;
            }

            // 3. Filtro por Tipo
            if (tipo && tipo.trim() !== "") {
                const mTipo = m.tipo || m.type || '';
                if (!mTipo || String(mTipo).toLowerCase() !== tipo.toLowerCase()) return false;
            }

            // 4. Filtro por Status
            if (activeStatusKeys.length > 0) {
                const mStatus = m.status || '';
                const norm = normalize(mStatus);
                // Verifica se o status normalizado contém alguma das chaves ativas
                const matched = activeStatusKeys.some(sk => norm.includes(sk));
                if (!matched) return false;
            }

            return true;
        });

        setFilteredManifests(result);
    }

    // --- Efeitos ---

    // 1. Recarregar via Contexto
    useEffect(() => {
        if (reloadManifestacoes) {
            fetchManifests();
            setReloadManifestacoes(false);
        }
    }, [reloadManifestacoes]);

    // 2. Aplicar Filtros quando dados ou filtros mudam
    useEffect(() => {
        filterManifests();
    }, [manifests, filter]);

    // 3. Carregar dados iniciais ao montar ou mudar props
    useEffect(() => {
        if (classUser && id) {
            fetchManifests();
        }
    }, [classUser, id]);

    // --- Handlers de UI ---
    const detalhesClick = (manifestId) => {
        setManifestId(manifestId);
        setModalDetalhes(true);
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('pt-BR') + ' ' + new Date(dateString).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
        } catch (e) {
            return dateString;
        }
    }

    // Verifica se é admin (ajuste a string conforme sua lógica de negócio: 'admin', 'instituicao', etc)
    const isAdmin = classUser === 'admin' || classUser === 'instituicao';

    return (
        <div className="tableManifest">
            {loading && <p>Carregando manifestações...</p>}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            
            {!loading && !error && filteredManifests.length === 0 && (
                <p>Nenhuma manifestação encontrada.</p>
            )}

            {!loading && !error && filteredManifests.length > 0 && (
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Protocolo</th>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Ações</th>
                                <th>Detalhes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredManifests.map((m) => {
                                const protocolo = m.protocolo || m.protocol || m.id || '';
                                const tipo = m.tipo || m.type || '';
                                const rawDate = m.criado || m.date || m.createdAt || m.created_at || null;
                                const status = m.status || 'Pendente';

                                return (
                                    <tr key={m.id || protocolo}>
                                        <td>{protocolo}</td>
                                        <td>{tipo}</td>
                                        <td>{formatDate(rawDate)}</td>
                                        
                                        {/* Coluna Status (Texto puro ou Badge) */}
                                        <td>
                                            <span className={`status-badge status-${String(status).toLowerCase()}`}>
                                                {status}
                                            </span>
                                        </td>

                                        {/* Coluna Ações (Diferente para Admin e User) */}
                                        <td>
                                            {isAdmin ? (
                                                <select 
                                                    value={status} 
                                                    onChange={(e) => handleStatusChange(m.id, e.target.value)}
                                                    className="status-select"
                                                >
                                                    {statusOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <button 
                                                    className="btn-delete"
                                                    onClick={() => handleExcluir(m.id)}
                                                    title="Cancelar manifestação"
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                        </td>

                                        <td>
                                            <button onClick={() => detalhesClick(m.id)}>
                                                Ver Mais
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            
            <aside>
                {modalDetalhes && (
                    <ModalDetalhes 
                        id={manifestId} 
                        onClose={() => setModalDetalhes(false)} 
                    />
                )}
            </aside>
        </div>
    )
}

export default TableManifest;