import TableManifest from "./TableManifest";
import { useAppContext } from "../utils/Context";
function PanelAdmin() {
    const { user } = useAppContext();

    return (
        <main className="panelAdmin">
            <h2>Painel de manifestações</h2>
            <TableManifest classUser={"admin"} id={user.instituicao} />
            <div>
                <h3>Filtros</h3>
                <div>
                    <input type="text" placeholder="Pesquisa Geral"/>
                    <input type="date" name="date" id="dateInputFilter" placeholder="Data"/>

                    <datalist id="types">
                        <option value="Reclamação"/>
                        <option value="Elogio"/>
                        <option value="Sugestão"/>
                        <option value="Denúncia"/>
                    </datalist>
                    <input list="types" name="type" id="typeInputFilter" placeholder="Tipo"/>

                    <ul>
                        <span>Status</span>
                        <li><input type="checkbox" name="pendente" id="" />Pendente</li>
                        <li><input type="checkbox" name="analise" id="" />Em análise</li>
                        <li><input type="checkbox" name="processo" id="" />Em processo</li>
                        <li><input type="checkbox" name="concluida" id="" />Concluída</li>
                    </ul>
                    <button>Filtrar</button>
                </div>
            </div>
        </main>
    )
}

export default PanelAdmin;