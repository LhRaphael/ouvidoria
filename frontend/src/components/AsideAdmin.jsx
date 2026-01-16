import { useState, useEffect } from "react";
import { useAppContext } from "../utils/Context";
import PanelAdmin from "./PanelAdmin";
import ReportAdmin from "./ReportAdmin";
import SettingsAdmin from "./SettingsAdmin";
function AsideAdmin() {
    const { setAdminPanelData } = useAppContext();

    useEffect(() => {
        setAdminPanelData(<PanelAdmin />);
    }, [setAdminPanelData]);

    const setPanel = () =>{
        setAdminPanelData(<PanelAdmin />);
    }

    const setReport = () =>{
        setAdminPanelData(<ReportAdmin />);
    }

    const setConfig = () =>{
        setAdminPanelData(<SettingsAdmin />);
    }

    return (
        <aside className="asideAdmin">
            <h1>Admin Ouvidoria+</h1>
                <ul>
                    <li><button onClick={setPanel}>Manifestações</button></li>
                    <li><button onClick={setReport}>Relatórios</button></li>
                    <li><button onClick={setConfig}>Configurações</button></li>
                </ul>
        </aside>
    );
}

export default AsideAdmin;