import { useAppContext } from "../utils/Context";
import { useState, useEffect } from "react";


function Modal(){
    const { manageModal } = useAppContext();
    const { user } = useAppContext();
    const { setReloadManifestacoes } = useAppContext();
    const [instituicoes, setInstituicoes] = useState([])
    const [instituicao, setInstituicao] = useState("")
    const [instituicaoId, setInstituicaoId] = useState(null)
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    useEffect(() => {
        const fetchInstituicao = async () => {
            try {
                const response = await fetch(`http://localhost:3001/instituicoes`); // retorna todas as instituições
                const data = await response.json();

                const dataSet = data.map(item => ({
                    id: item.id,
                    nome: item.nome,
                    cnpj: item.cnpj,
                }));

                console.log("Instituições buscadas:", dataSet);
                
                setInstituicoes(dataSet);
            } catch (error) {
                console.error("Erro ao buscar instituição:", error);
            }
        };

        fetchInstituicao();
    }, []);

    const handleInstituicaoChange = (e) => {
        const value = e.target.value;
        setInstituicao(value);

        if (!value) {
            setSuggestions([]);
            setShowSuggestions(false);
            setActiveIndex(-1);
            return;
        }

        const filtered = instituicoes.filter((inst) =>
            inst.nome.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
        setActiveIndex(-1);
    }

    const handleSuggestionClick = (inst) => {
        setInstituicao(inst.nome);
        setInstituicaoId(inst.id);
        setSuggestions([]);
        setShowSuggestions(false);
        setActiveIndex(-1);
    }

    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        if (e.key === 'ArrowDown') {
            setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < suggestions.length) {
                handleSuggestionClick(suggestions[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    }

    const saveManifestation = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            tipo: formData.get("type"),
            descricao: formData.get("descriptionModal"),
            arquivo: formData.get("fileModal"),
            anonimo: formData.get("anonimo") === "on" ? true : false,
            usuarioId: user.id,
            instituicaoId: instituicaoId,
        }

        try {
            const response = await fetch("http://localhost:3001/manifestacoes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Manifestação registrada com sucesso!");
                manageModal();
                setReloadManifestacoes(prev => !prev);
            } else {
                alert("Erro ao registrar manifestação.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao registrar manifestação.");
        }
    
    }

    return (
        <form className="modal" onSubmit={saveManifestation}>
            <h2>Registrar nova manifestação</h2>
            <div>
                <span>Selecionar Categória</span>
                <select name="type" id="typeSelectModal">
                    <option value="Reclamação">Reclamação</option>
                    <option value="Elogio">Elogio</option>
                    <option value="Sugestão">Sugestão</option>
                    <option value="Denúncia">Denúncia</option>
                </select>
            </div>
            <div>
                <label htmlFor="descriptionModal">Descrição</label>
                <textarea name="descriptionModal" id="descriptionModal" placeholder="Descreva sua manifestação aqui..." ></textarea>
            </div>
            <div style={{ position: 'relative' }}>
                <span>Instituição</span>
                <input
                    type="text"
                    name="instituicao"
                    value={instituicao}
                    onChange={handleInstituicaoChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />

                {showSuggestions && (
                    <ul className="suggestions-list" style={{ position: 'absolute', zIndex: 10, background: 'white', listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc', width: '100%' }}>
                        {suggestions.map((inst, idx) => (
                            <li
                                key={inst.id}
                                onClick={() => handleSuggestionClick(inst)}
                                style={{ padding: '8px', cursor: 'pointer', background: idx === activeIndex ? '#eee' : 'transparent' }}
                            >
                                {inst.nome}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <label htmlFor="fileModal">Anexar arquivo (opcional)</label>
                <input type="file" name="fileModal" id="fileModal"/>
            </div>
            <div>
                <input type="checkbox" name="anonimo" id="anonimo" />
                <label htmlFor="anonimo">Manifestação anônima</label>
                <span>Seu Perfil não será anexado à manifestação</span>
            </div>
            <div>
                <button onClick={manageModal}>Cancelar</button>
                <input type="submit" value="Enviar" />
            </div>
        </form>
    )
}

export default Modal;