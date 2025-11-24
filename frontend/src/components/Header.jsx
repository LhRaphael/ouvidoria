import { Link } from "react-router-dom";

function Header({children}) {
    return (
        <header>
            <Link to="/"><h1>Ouvidoria+</h1></Link>
            {children}
        </header>
    );
}

export default Header;