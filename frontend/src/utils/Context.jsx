import React, { createContext, useState, useContext} from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null); // gerenciar o estado do usuário
    const [isModalOpen, setIsModalOpen] = useState(false); // gerenciar o estado do modal de manifestação
    const [adminPanelData, setAdminPanelData] = useState(null); // gerenciar dados do painel admin

    const manageModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <AppContext.Provider value={{ user, setUser, isModalOpen, manageModal, adminPanelData, setAdminPanelData }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}