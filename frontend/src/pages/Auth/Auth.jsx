// src/pages/Auth.jsx
import "./Auth.css"

import { useContext } from "react";
import { UserContext } from "../../data";
import { setUserToken, clearUserToken } from "../../utilities/auth-token";
import { login, signUp } from "../../utilities/auth-services";

import SignUpForm from "../../components/Auth/SignUpForm";
import LoginForm from "../../components/Auth/LoginForm";

export default function Auth() {
    const { setAuth, setUser } = useContext(UserContext);

    async function handleSignUpUser(data){
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

    async function handleLoginUser(data){
        try {
            const parsedUser = await login(data);
            if (parsedUser.token) {
                setUserToken(parsedUser.token);
                setUser(parsedUser.user);
                setAuth(parsedUser.isLoggedIn);
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

    return (
        <section className="container">
            <SignUpForm signUp={handleSignUpUser} />
            <LoginForm login={handleLoginUser} />
        </section>
    );
}
