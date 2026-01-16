import { useState, useEffect} from "react";
import { useAppContext } from "../utils/Context";

export function ModalDetalhes({id, onClose}){
    const [manifestacao, setManifestacao] = useState(null);

    const fetchManifestacaoDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/manifestacoes/simple/${id}`);
            const data = await response.json();
            setManifestacao(data);
        } catch (error) {
            console.error("Erro ao buscar detalhes da manifestação:", error);
        }
    } 

    useEffect(() => {
        fetchManifestacaoDetails();
    }, [id]);

    return(
        <div>
            <div>
                <h2>{manifestacao?.usuario}</h2>
                <p>{manifestacao?.conteudo}</p>
                <span>{manifestacao?.data}</span>
            </div>
            <button onClick={onClose}>Fechar</button>
        </div>
    );
}