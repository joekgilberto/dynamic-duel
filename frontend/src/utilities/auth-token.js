export function getUserToken(){
    return localStorage.getItem("token");
};

export function setUserToken(token){
    return localStorage.setItem("token", token);
};

export function clearUserToken(){
    return localStorage.setItem("token", "");
};