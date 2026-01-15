import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "../utils/Context";

function ReportAdmin() {
    const { user } = useAppContext();
    
    // Estados
    const [manifestacoes, setManifestacoes] = useState([]);
    const [relatoriosSalvos, setRelatoriosSalvos] = useState([]);
    
    // Estado do formulário/geração
    const [relatorioGerado, setRelatorioGerado] = useState("");
    const [loading, setLoading] = useState(false);
    const [mesFiltro, setMesFiltro] = useState(new Date().toISOString().slice(0, 7)); // Formato YYYY-MM

    // --- Buscas de Dados ---

    const fetchManifestacoes = async () => {
        try {
            const response = await fetch(`http://localhost:3001/manifestacoes/admin/${user.instituicao}`);
            if (!response.ok) throw new Error("Falha ao buscar manifestações");
            const data = await response.json();
            setManifestacoes(data);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchRelatoriosSalvos = async () => {
        try {
            const response = await fetch(`http://localhost:3001/ia/relatorios/${user.instituicao}`);
            if (!response.ok) throw new Error("Falha ao buscar relatórios salvos");
            const data = await response.json();
            setRelatoriosSalvos(data.reverse());
        } catch (err) {
            console.error(err);
        }
    }

    // --- Lógica de Filtro e Geração ---

    // Memoiza as manifestações filtradas para evitar recálculos desnecessários
    const manifestacoesFiltradas = useMemo(() => {
        if (!mesFiltro) return [];
        const [ano, mes] = mesFiltro.split('-');

        return manifestacoes.filter((m) => {
            const dataM = new Date(m.criado);
            return (
                dataM.getMonth() + 1 === parseInt(mes) &&
                dataM.getFullYear() === parseInt(ano)
            );
        });
    }, [manifestacoes, mesFiltro]);

    const gerarRelatorio = async () => {
        if (manifestacoesFiltradas.length === 0) {
            alert("Não há manifestações neste mês para gerar um relatório.");
            return;
        }

        setLoading(true);
        try {
            const conteudo = manifestacoesFiltradas
                .map((m) => `[${m.tipo}] ${m.conteudo}`)
                .join("\n\n-----------------\n\n");

            const response = await fetch('http://localhost:3001/ia/gerar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: conteudo }),
            });

            if (!response.ok) throw new Error("Erro na geração da IA");

            const textoGerado = await response.text();
            setRelatorioGerado(textoGerado);
        } catch (err) {
            console.error("Erro ao gerar relatório:", err);
            alert("Erro ao comunicar com a IA.");
        } finally {
            setLoading(false);
        }
    }

    const salvarRelatorio = async () => {
        if (!relatorioGerado) return;

        try {
            const response = await fetch('http://localhost:3001/ia/salvar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instituicaoId: user.instituicao,
                    texto: relatorioGerado,
                }),
            });

            if (!response.ok) throw new Error("Erro ao salvar");
            
            alert("Relatório salvo com sucesso!");
            setRelatorioGerado(""); // Limpa após salvar
            fetchRelatoriosSalvos(); // Atualiza a lista
        } catch (err) {
            console.error("Erro ao salvar relatório:", err);
            alert("Não foi possível salvar o relatório.");
        }
    }

    useEffect(() => {
        if (user?.instituicao) {
            fetchManifestacoes();
            fetchRelatoriosSalvos();
        }
    }, [user]);

    return (
        <div className="reportAdmin">
            <h2>Gestão de Relatórios com IA</h2>
            
            <div className="filtros-container">
                <label htmlFor="mesFiltro">Selecione o Mês de Referência:</label>
                <input 
                    type="month" 
                    id="mesFiltro" 
                    value={mesFiltro} 
                    onChange={(e) => setMesFiltro(e.target.value)} 
                />
                <button 
                    onClick={fetchManifestacoes} 
                    title="Atualizar lista de manifestações"
                >
                    Atualizar Dados
                </button>
            </div>

            <div className="geracao-container" style={{ margin: '20px 0', border: '1px solid #ddd', padding: '15px' }}>
                <h3>Gerar Novo Relatório</h3>
                <p>Manifestações encontradas no período: <strong>{manifestacoesFiltradas.length}</strong></p>
                
                <button 
                    onClick={gerarRelatorio} 
                    disabled={loading || manifestacoesFiltradas.length === 0}
                >
                    {loading ? "Gerando..." : "Gerar Relatório (IA)"}
                </button>

                {relatorioGerado && (
                    <div className="preview-relatorio" style={{ marginTop: '15px' }}>
                        <h4>Pré-visualização:</h4>
                        <textarea 
                            rows="10" 
                            style={{ width: '100%' }} 
                            value={relatorioGerado} 
                            onChange={(e) => setRelatorioGerado(e.target.value)} // Permite edição manual antes de salvar
                        />
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={salvarRelatorio}>Confirmar e Salvar</button>
                            <button onClick={() => setRelatorioGerado("")} style={{ marginLeft: '10px', background: '#ccc' }}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="historico-container">
                <h3>Histórico de Relatórios Salvos</h3>
                {relatoriosSalvos.length === 0 ? <p>Nenhum relatório salvo.</p> : (
                    <ul>
                        {relatoriosSalvos.map((r, index) => (
                            <li key={r.id || index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee' }}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{r.conteudo}</p>
                                <small>Gerado em: {r.criacao ? new Date(r.criacao).toLocaleDateString() : 'Data desconhecida'}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default ReportAdmin;