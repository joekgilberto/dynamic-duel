import "./Header.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../data";
import { clearUserToken } from "../../utilities/auth/auth-token";

export default function Header() {
    const { setAuth, setUser, user } = useContext(UserContext);

    function handleLogout(e) {
        clearUserToken()
        setUser(null);
        setAuth(null);
    }

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
                    {user ? (
                        <>
                            <Link to="/battles/new/0">
                                <h2>Pick A Fight</h2>
                            </Link>
                            <Link to="/user">
                                <h2 className="login-button">Profile</h2>
                            </Link>
                            <Link to="/" onClick={handleLogout}>
                                <h2 className="login-button">Logout</h2>
                            </Link>
                        </>
                    ) : (
                        <Link to="/auth">
                            <h2 className="login-button">Login</h2>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}