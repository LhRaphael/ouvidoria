import { useState, useEffect } from "react";
import { useAppContext } from "../utils/Context";
import { ModalDetalhes } from "./ModalDetalhes";

function TableManifest({classUser, id, filter}) {
    const [manifests, setManifests] = useState([]);
    const [filteredManifests, setFilteredManifests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { reloadManifestacoes, setReloadManifestacoes } = useAppContext();
    const [modalDetalhes, setModalDetalhes] = useState(false);
    const [manifestId, setManifestId] = useState(null);

    const fetchManifests = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3001/manifestacoes/${classUser}/${id}`);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            const data = await response.json();
            setManifests(Array.isArray(data) ? data : []);
            setFilteredManifests(Array.isArray(data) ? data : []);
            console.log("Manifestações buscadas:", data);
        } catch (err) {
            console.error("Erro ao buscar manifestações:", err);
            setError(err.message || "Erro desconhecido");
            setManifests([]);
            setFilteredManifests([]);
        } finally {
            setLoading(false);
        }
    }

    const filterManifests = () => {
        const list = Array.isArray(manifests) ? manifests : [];
        if (!list.length) {
            setFilteredManifests([]);
            return;
        }

        const { pesquisaGeral = "", data = "", tipo = "", status = {} } = filter || {};
        const activeStatusKeys = Object.keys(status).filter(k => status[k]);

        const normalize = (s) => {
            if (!s && s !== 0) return "";
            return String(s)
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replace(/[^a-z0-9]/g, '');
        }

        const result = list.filter((m) => {
            // pesquisa geral: procura em todos os valores-string do objeto
            if (pesquisaGeral && pesquisaGeral.trim() !== "") {
                const hay = Object.values(m)
                    .map(v => (typeof v === 'string' || typeof v === 'number') ? String(v) : '')
                    .join(' ')
                    .toLowerCase();
                if (!hay.includes(pesquisaGeral.toLowerCase())) return false;
            }

            // filtro por data (compara YYYY-MM-DD)
            if (data && data !== "") {
                const rawDate = m.criado || m.date || m.createdAt || m.created_at || null;
                if (!rawDate) return false;
                const dateOnly = new Date(rawDate).toISOString().slice(0, 10);
                if (dateOnly !== data) return false;
            }

            // filtro por tipo
            if (tipo && tipo.trim() !== "") {
                const mTipo = m.tipo || m.type || '';
                if (!mTipo || String(mTipo).toLowerCase() !== tipo.toLowerCase()) return false;
            }

            // filtro por status (quando pelo menos um estiver ativo)
            if (activeStatusKeys.length > 0) {
                const mStatus = m.status || '';
                const norm = normalize(mStatus);
                const matched = activeStatusKeys.some(sk => norm.includes(sk));
                if (!matched) return false;
            }

            return true;
        });

        setFilteredManifests(result);
    }

    const reloadData = () => {
        if(reloadManifestacoes){
            fetchManifests();
            setReloadManifestacoes(false);
        }
    }
    
    useEffect(() => {
        reloadData();
    }, [reloadManifestacoes]);

    useEffect(() => {
        filterManifests();
    }, [manifests, filter]);

    useEffect(() => {
        if (classUser && id) fetchManifests();
    }, [classUser, id]);
    
    
    const detalhesClick = (manifestId) => {
        setManifestId(manifestId);
        setModalDetalhes(true);
    }

    return (
        <div className="tableManifest">
            {loading && <p>Carregando manifestações...</p>}
            {error && <p style={{color: 'red'}}>Erro: {error}</p>}
            {!loading && !error && filteredManifests.length === 0 && (
                <p>Nenhuma manifestação encontrada.</p>
            )}

            {!loading && !error && filteredManifests.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Protocolo</th>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredManifests.map((m) => {
                            const protocolo = m.protocolo || m.protocol || m.id || '';
                            const tipo = m.tipo || m.type || '';
                            const rawDate = m.criado || m.date || m.createdAt || m.created_at || null;
                            const dataStr = rawDate ? new Date(rawDate).toLocaleString() : '';
                            const status = m.status || '';

                            return (
                                <tr key={m.id || protocolo}>
                                    <td>{protocolo}</td>
                                    <td>{tipo}</td>
                                    <td>{dataStr}</td>
                                    <td>{status}</td>
                                    <td><button onClick={() => detalhesClick(m.id)}>...</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            <aside>
                {modalDetalhes && <ModalDetalhes id={manifestId} onClose={() => setModalDetalhes(false)} />}
            </aside>
        </div>
    )
}

export default TableManifest;