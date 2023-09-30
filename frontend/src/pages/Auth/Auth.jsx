import "./Auth.css"

import { useState, useContext } from "react";
import { UserContext } from "../../data";
import { setUserToken, clearUserToken, setUser, clearUser } from "../../utilities/auth/auth-token";
import { login, signUp } from "../../utilities/auth/auth-services";

import SignUpForm from "../../components/Auth/SignUpForm";
import LoginForm from "../../components/Auth/LoginForm";

export default function Auth() {
    const { setAuth, setCurrentUser } = useContext(UserContext);
    const [returningUser, setReturningUser] = useState(true)

    async function handleSignUpUser(data) {
        try {
            const parsedUser = await signUp(data);
            if (parsedUser.token) {
                setUserToken(parsedUser.token);
                setUser(parsedUser.user);
                setCurrentUser(parsedUser.user)
                setAuth(parsedUser.isLoggedIn);
                return parsedUser
            } else {
                throw `Server Error: ${parsedUser.err}`;
            }
        } catch (err) {
            console.log(err);
            clearUserToken();
            clearUser()
            setCurrentUser(null)
            setAuth(false);
            return null;
        }
    };

    function toggleReturning() {
        setReturningUser(!returningUser)
    }

    async function handleLoginUser(data) {
        try {
            const parsedUser = await login(data);
            if (parsedUser.token) {
                setUserToken(parsedUser.token);
                setUser(parsedUser.user);
                setCurrentUser(parsedUser.user)
                setAuth(parsedUser.isLoggedIn);
            } else {
                throw `Server Error: ${parsedUser.err}`;
            }
            return parsedUser
        } catch (err) {
            console.log(err);
            clearUserToken();
            clearUser()
            setCurrentUser(null)
            setAuth(false);
            return null;
        }
    };

    return (
        <section className="Auth">
            {!returningUser ? (
                <>
                    <SignUpForm signUp={handleSignUpUser} setReturningUser={setReturningUser} />
                    <button className="toggle-login-signup" onClick={toggleReturning}>Login</button>
                </>
            ) : (
                <>
                    <LoginForm login={handleLoginUser} />
                    <button className="toggle-login-signup" onClick={toggleReturning}>Sign Up</button>
                </>
            )}
        </section>
    );
}
