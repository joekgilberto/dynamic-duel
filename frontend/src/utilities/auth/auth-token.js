import { jwt_decode } from "jwt-decode";

export function getUserToken() {
    return localStorage.getItem("token");
};

export function setUserToken(token) {
    return localStorage.setItem("token", token);
};

export function clearUserToken() {
    return localStorage.setItem("token", "");
};

export function getUser() {
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
    }
};

export function setUser(user) {
    if (user) {
        return localStorage.setItem("user", user);
    }
};

export function clearUser() {
    return localStorage.setItem("user", "");
};

export function decodeToken(token) {
    return jwt_decode(token);
}