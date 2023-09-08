import "./Header.css"
import { Link } from "react-router-dom";
import { clearUserToken, getUserToken } from "../../utilities/auth-token";
import { useState, useEffect } from "react";

export default function Header() {
    
    const [token, setToken] = useState(getUserToken())

    function handleClick(e){
        clearUserToken()
        setToken(getUserToken())
    }

    useEffect(()=>{
        setToken(getUserToken())
    },[getUserToken()])

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
                    {token ? (
                        <Link to="/battles/new">
                            <h2>Pick A Fight</h2>
                        </Link>
                    ) : null}
                    {token ? (
                        <>
                        {/* <Link to="/user">
                            <h2 className="login-button">User</h2>
                        </Link>  */}
                        <Link to="/auth" onClick={handleClick}>
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