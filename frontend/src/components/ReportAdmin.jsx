import { useState } from "react";

function ReportAdmin() {
    return (
        <div>
            <h2>Relatório Administrativo</h2>
            <div>
                <input type="date" name="dataRelatorio" id="dataRelaatorio" />
                <button>Buscar</button>
            </div>
            <div>
                {/* onde os relátorios serão carregados */}
            </div>
        </div>
    )
}

export default ReportAdmin;