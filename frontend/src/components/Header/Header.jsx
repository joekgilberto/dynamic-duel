import "./Header.css"
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav>
                <Link to="/">
                    <img className="logo" src={require("../../assets/logo.png")} />
                </Link>

                <div className="nav-buttons">
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                <Link to="/battles">
                    <h2>Battles</h2>
                </Link>
                <Link to="/battles/new">
                    <h2>Pick A Fight</h2>
                </Link>
                <Link to="/auth">
                    <h2 className="login-button">Login</h2>
                </Link>
                </div>
            </nav>
        </header>
    )
}