import { useState } from "react";
import { useAppContext } from "../utils/Context";

function Modal(){
    const { manageModal } = useAppContext();

    return (
        <div className="modal">
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
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default Modal;