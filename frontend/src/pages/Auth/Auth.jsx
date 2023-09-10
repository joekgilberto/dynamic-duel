// src/pages/Auth.jsx
import "./Auth.css"

import { useState, useContext } from "react";
import { UserContext } from "../../data";
import { setUserToken, clearUserToken } from "../../utilities/auth-token";
import { login, signUp } from "../../utilities/auth-services";

import SignUpForm from "../../components/Auth/SignUpForm";
import LoginForm from "../../components/Auth/LoginForm";

export default function Auth() {
    const { setAuth, setUser, user } = useContext(UserContext);
    const [returningUser, setReturningUser] = useState(true)

    async function handleSignUpUser(data) {
        try {
            const parsedUser = await signUp(data);
            if (parsedUser.token) {
                // sets local storage
                setUserToken(parsedUser.token);
                // put the returned user object in state
                setUser(parsedUser.user);
                // adds a boolean cast of the responses isAuthenticated prop
                setAuth(parsedUser.isLoggedIn);
                // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
                // this would also require reconfiguring our backend so we only send tokens with a signup
                return parsedUser
            } else {
                throw `Server Error: ${parsedUser.err}`;
            }
        } catch (err) {
            console.log(err);
            clearUserToken();
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
                setAuth(parsedUser.isLoggedIn);
            } else {
                throw `Server Error: ${parsedUser.err}`;
            }
            return parsedUser
        } catch (err) {
            console.log(err);
            clearUserToken();
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
