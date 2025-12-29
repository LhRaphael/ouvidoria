import AsideAdmin from "../components/AsideAdmin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "../utils/Context";

function AdminMain(){
    const { adminPanelData } = useAppContext();
    return (
        <div>
            <Header/>
            {adminPanelData}
            <AsideAdmin/>
            <Footer/>
        </div>
    )
}

export default AdminMain;