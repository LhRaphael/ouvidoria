import AsideAdmin from "../components/AsideAdmin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminMain(){
    const { adminPanelData } = useAppContext();
    const { user } = useAppContext()

    const navigate = useNavigate()

     useEffect(() => {
        
        if (!user || !user.nome) {
            navigate("/loginForm");
        }
    }, [user, navigate]);

    if (!user || !user.nome) {
        return null; 
    }

    return (
        <div className="admin-layout">
            <Header/>
            {adminPanelData}
            <AsideAdmin/>
            <Footer/>
        </div>
    )
}

export default AdminMain;