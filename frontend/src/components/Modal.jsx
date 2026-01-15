import { useAppContext } from "../utils/Context";
import { useState, useEffect } from "react";

function Modal() {
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
                const response = await fetch(`http://localhost:3001/instituicoes`);
                const data = await response.json();

                const dataSet = data.map(item => ({
                    id: item.id,
                    nome: item.nome,
                    cnpj: item.cnpj,
                }));
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
                headers: { "Content-Type": "application/json" },
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
        // O overlay cobre toda a tela e fecha o modal ao ser clicado
        <div className="modal-overlay" onClick={manageModal}>
            {/* O stopPropagation impede que o clique no form feche o modal */}
            <form className="modal-content" onSubmit={saveManifestation} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Nova Manifestação</h2>
                    <button type="button" className="close-btn" onClick={manageModal}>&times;</button>
                </div>

                <div className="form-group">
                    <label htmlFor="typeSelectModal">Categoria</label>
                    <select name="type" id="typeSelectModal" required>
                        <option value="" disabled selected>Selecione...</option>
                        <option value="Reclamação">Reclamação</option>
                        <option value="Elogio">Elogio</option>
                        <option value="Sugestão">Sugestão</option>
                        <option value="Denúncia">Denúncia</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="descriptionModal">Descrição</label>
                    <textarea 
                        name="descriptionModal" 
                        id="descriptionModal" 
                        placeholder="Descreva os detalhes aqui..." 
                        required 
                        rows="4"
                    ></textarea>
                </div>

                <div className="form-group" style={{ position: 'relative' }}>
                    <label>Instituição</label>
                    <input
                        type="text"
                        name="instituicao"
                        value={instituicao}
                        onChange={handleInstituicaoChange}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        placeholder="Busque pelo nome da instituição..."
                        required
                    />

                    {showSuggestions && (
                        <ul className="suggestions-list">
                            {suggestions.map((inst, idx) => (
                                <li
                                    key={inst.id}
                                    className={idx === activeIndex ? "active" : ""}
                                    onClick={() => handleSuggestionClick(inst)}
                                >
                                    {inst.nome}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* <div className="form-group">
                    <label htmlFor="fileModal">Anexar arquivo <small>(opcional)</small></label>
                    <input type="file" name="fileModal" id="fileModal" />
                </div> */}

                <div className="form-check">
                    <input type="checkbox" name="anonimo" id="anonimo" />
                    <div>
                        <label htmlFor="anonimo">Manifestação Anônima</label>
                        <small>Seu perfil não será vinculado publicamente.</small>
                    </div>
                </div>

                <div className="modal-actions">
                    <button type="button" className="btn-secondary" onClick={manageModal}>Cancelar</button>
                    <button type="submit" className="btn-primary">Registrar</button>
                </div>
            </form>
        </div>
    )
}

export default Modal;