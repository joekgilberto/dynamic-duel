import jwt_decode from "jwt-decode";

export function getUserToken(){
    return localStorage.getItem("token");
};

export function setUserToken(token){
    return localStorage.setItem("token", token);
};

export function clearUserToken(){
    return localStorage.setItem("token", "");
};

export function decodeToken(token) {
  return jwt_decode(token);
}