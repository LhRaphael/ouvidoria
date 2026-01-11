import { useState, useEffect } from "react";
import { useAppContext } from "../utils/Context";

function TableManifest({classUser, id}) {
    const [manifests, setManifests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { reloadManifestacoes, setReloadManifestacoes } = useAppContext();

    const fetchManifests = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3001/manifestacoes/${classUser}/${id}`);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            const data = await response.json();
            setManifests(Array.isArray(data) ? data : []);
            console.log("Manifestações buscadas:", data);
        } catch (err) {
            console.error("Erro ao buscar manifestações:", err);
            setError(err.message || "Erro desconhecido");
            setManifests([]);
        } finally {
            setLoading(false);
        }
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
        if (classUser && id) fetchManifests();
    }, [classUser, id]);
    
    
    return (
        <div className="tableManifest">
            {loading && <p>Carregando manifestações...</p>}
            {error && <p style={{color: 'red'}}>Erro: {error}</p>}
            {!loading && !error && manifests.length === 0 && (
                <p>Nenhuma manifestação encontrada.</p>
            )}

            {!loading && !error && manifests.length > 0 && (
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
                        {manifests.map((m) => {
                            const protocolo = m.protocolo || m.protocol || m.id || '';
                            const tipo = m.tipo || m.type || '';
                            const rawDate = m.data || m.date || m.createdAt || m.created_at || null;
                            const dataStr = rawDate ? new Date(rawDate).toLocaleString() : '';
                            const status = m.status || '';
                            const detalhes = m.detalhes || m.details || m.description || '';

                            return (
                                <tr key={m.id || protocolo}>
                                    <td>{protocolo}</td>
                                    <td>{tipo}</td>
                                    <td>{dataStr}</td>
                                    <td>{status}</td>
                                    <td>{detalhes}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default TableManifest;