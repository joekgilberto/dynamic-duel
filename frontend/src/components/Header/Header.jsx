import "./Header.css"

export default function Header(){
    return(
        <header>
            <nav>
                <img className="logo" src="https://i.imgur.com/shSC6zH.png" />
                <h2>Home</h2>
                <h2>Battles</h2>
                <h2>Pick A Fight</h2>
                <h2 className="login-button">Login</h2>
            </nav>
        </header>
    )
}