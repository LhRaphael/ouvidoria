import { useEffect, useState } from "react";
import { useAppContext } from "../utils/Context";

function ReportAdmin() {
    const { user } = useAppContext();
    const [manifestacoes, setManifestacoes] = useState([]);
    const [relatorio, setRelatorio] = useState("");
    const [relatorios, setRelatorios] = useState([]);

    const fetchManifestacoes = async () => {
        try {
            const response = await fetch(`http://localhost:3001/manifestacoes/admin/${user.instituicao}`);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            const data = await response.json();
            setManifestacoes(data);
        } catch (err) {
            console.error("Erro ao buscar manifestações para relatório:", err);
            setManifestacoes([]);
        }
    }

    // Retorna apenas as manifestações do mês atual
    const manifestacoesDoMesAtual = () => {
        const mesAtual = new Date().getMonth() + 1;
        return manifestacoes.filter((m) => {
            try {
                const mes = new Date(m.criado).getMonth() + 1;
                return mes === mesAtual;
            } catch (e) {
                return false;
            }
        });
    }

    async function gerarRelatorioAdmin(){ 
        const selecionadas = manifestacoesDoMesAtual();
        console.log("Manifestações selecionadas para o relatório:", selecionadas);
        const conteudo = selecionadas.map((m)=> m.conteudo).join("\n\n-----------------\n\n");
        console.log("Conteúdo para o relatório:", conteudo);

        const result = await fetch('http://localhost:3001/ia/gerar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: conteudo
            }),
        });
        if(!result.ok){
            
            console.error("Erro ao gerar relatório administrativo");
        } else {
            console.log("Relatório administrativo gerado com sucesso");
            setRelatorio(await result.text());
        }
    
    }

    const saveRelatorio = async () => {
        try {
            const response = await fetch('http://localhost:3001/ia/salvar', {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instituicao: user.instituicao,
                    relatorio: relatorio,
                }),
            });
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            console.log("Relatório salvo com sucesso");
        } catch (err) {
            console.error("Erro ao salvar relatório:", err);
        }
    }

    const fetchRelatorios = async () => {
        try {
            const response = await fetch(`http://localhost:3001/ia/relatorios/${user.instituicao}`);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            const data = await response.json();
            setRelatorios(data);
        } catch (err) {
            console.error("Erro ao buscar relatórios:", err);
            setRelatorios([]);
        }
    }

    useEffect(() => {
        fetchManifestacoes();
        fetchRelatorios();
    }, []);
    
    return (
        <div className="reportAdmin">
            <h2>Relatório Administrativo</h2>
            <div>
                <input type="date" name="dataRelatorio" id="dataRelatorio" />
                <button>Buscar</button>
            </div>
            <div>
                <h3>Relatórios Gerados:</h3>
                <ul>
                    {relatorios.map((r, index) => (
                        <li key={index}>{r}</li>
                    ))}
                </ul>
                <button onClick={ () => {gerarRelatorioAdmin(); saveRelatorio()}}>Gerar Relatório</button>
            </div>
        </div>
    )
}

export default ReportAdmin;