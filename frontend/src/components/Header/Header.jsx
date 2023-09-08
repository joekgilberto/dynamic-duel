import "./Header.css"
import { Link } from "react-router-dom";
import { getUserToken } from "../../utilities/auth-token";

export default function Header() {
    const token = getUserToken()

    console.log("token", token)

   async function handleClick(e){
        //logout function
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
                    {token ? (
                        <Link to="/battles/new">
                            <h2>Pick A Fight</h2>
                        </Link>
                    ) : null}
                    {token ? (
                        <>
                        {/* <Link to="/user">
                            <h2 className="login-button">User</h2>
                        </Link> 
                        <h2 className="login-button">Logout</h2>
                        */}
                        </>
                    ) : (
                        <Link to="/auth">
                            <h2 className="login-button" onClick={handleClick}>Login</h2>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}