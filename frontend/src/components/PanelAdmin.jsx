import TableManifest from "./TableManifest";
import { useAppContext } from "../utils/Context";
import { useState } from "react";
function PanelAdmin() {
    const { user } = useAppContext();
    const [filtros, setFiltros] = useState({
        pesquisaGeral: "",
        data: "",
        tipo: "",
        status: {
            pendente: false,
            analise: false,
            processo: false,
            concluida: false
        }
    })

    const setPesquisaGeral = (e) => {
        setFiltros({...filtros, pesquisaGeral: e.target.value});
    }

    const setData = (e) => {
        setFiltros({...filtros, data: e.target.value});
    }

    const setTipo = (e) => {
        setFiltros({...filtros, tipo: e.target.value});
    }

    const setStatus = (e) => {
        setFiltros({...filtros, status: {...filtros.status, [e.target.name]: e.target.checked}});
    }

    return (
        <main className="panelAdmin">
            <h2>Painel de manifestações</h2>
            <TableManifest classUser={"admin"} id={user.instituicao} filter={filtros} />
            <div>
                <h3>Filtros</h3>
                <div>
                    <input type="text" placeholder="Pesquisa Geral" onChange={setPesquisaGeral}/>
                    <input type="date" name="date" id="dateInputFilter" placeholder="Data" onChange={setData}/>

                    <datalist id="types">
                        <option value="Reclamação"/>
                        <option value="Elogio"/>
                        <option value="Sugestão"/>
                        <option value="Denúncia"/>
                    </datalist>
                    <input list="types" name="type" id="typeInputFilter" placeholder="Tipo" onChange={setTipo}/>
                    <ul>
                        <span>Status</span>
                        <li><input type="checkbox" name="pendente" id="" onChange={setStatus} />Pendente</li>
                        <li><input type="checkbox" name="analise" id="" onChange={setStatus} />Em análise</li>
                        <li><input type="checkbox" name="processo" id="" onChange={setStatus} />Em processo</li>
                        <li><input type="checkbox" name="concluida" id="" onChange={setStatus} />Concluída</li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default PanelAdmin;