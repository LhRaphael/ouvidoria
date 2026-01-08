import { useAppContext } from "../utils/Context";

function Modal(){
    const { manageModal } = useAppContext();
    const { user } = useAppContext();

    const saveManifestation = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            tipo: formData.get("type"),
            descricao: formData.get("descriptionModal"),
            arquivo: formData.get("fileModal"),
            anonimo: formData.get("anonimo") === "on" ? true : false,
            usuario: user.id,
        }

        try {
            const response = await fetch("http://localhost:3001/manifestacao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Manifestação registrada com sucesso!");
                manageModal();
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
                    <option value="reclamacao">Reclamação</option>
                    <option value="elogio">Elogio</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="denuncia">Denúncia</option>
                </select>
            </div>
            <div>
                <label htmlFor="descriptionModal">Descrição</label>
                <textarea name="descriptionModal" id="descriptionModal" placeholder="Descreva sua manifestação aqui..." ></textarea>
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