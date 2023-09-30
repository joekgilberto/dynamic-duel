import "./Header.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../data";
import { setUser, clearUser, clearUserToken } from "../../utilities/auth/auth-token";

export default function Header() {
    const { setAuth, setCurrentUser, user } = useContext(UserContext);

    function handleLogout(e) {
        clearUserToken()
        clearUser()
        setCurrentUser(null)
        setUser(null);
        setAuth(null);
    }

    return (
        <header>
            <nav>
                <Link to="/">
                    <img className="logo" src={require("../../assets/logo.png")} alt="Dynamic Duel logo" />
                </Link>

                <div className="nav-buttons">
                    {!user ? (
                        <>
                            <Link to="/">
                                <button key={2} style={{ animation: 'bump .5s forwards .5s' }}>Home</button>
                            </Link>
                            <Link to="/battles">
                                <button key={1} style={{ animation: 'bump .5s forwards .25s' }}>Battles</button>
                            </Link>
                            <Link to="/auth">
                                <button key={0} className="auth-button" style={{ animation: 'blue-bump .5s forwards' }}>Login</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/">
                                <button key={4} style={{ animation: 'bump .5s forwards 1.25s' }}>Home</button>
                            </Link>
                            <Link to="/battles">
                                <button key={3} style={{ animation: 'bump .5s forwards 1s' }}>Battles</button>
                            </Link>
                            <Link to="/battles/new/0">
                                <button key={2} style={{ animation: 'bump .5s forwards .75s' }}>Pick A Fight</button>
                            </Link>
                            <Link to="/user">
                                <button key={1} className="auth-button" style={{ animation: 'blue-bump .5s forwards .5s' }}>Profile</button>
                            </Link>
                            <Link to="/" onClick={handleLogout}>
                                <button key={0} className="auth-button" style={{ animation: 'blue-bump .5s forwards .25s' }}>Logout</button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}