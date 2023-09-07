import * as AuthAPI from "./auth-api"

export async function signUp(data) {
    try {
        const apiRegResp = await AuthAPI.signUpUser(data)
        console.log("apiRegResp",apiRegResp)
        return apiRegResp
    } catch (err) {
        throw err
    }
}


export async function login(data) {
    try {
        const apiLoginResp = await AuthAPI.loginUser(data)
        console.log("apiLoginResp",apiLoginResp)
        return apiLoginResp
    } catch (err) {
        throw err
    }
}