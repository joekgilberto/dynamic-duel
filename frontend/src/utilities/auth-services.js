import * as AuthAPI from "./auth-api"

export async function signUp(data) {
    try {
        const apiRegResp = await AuthAPI.signUpUser(data)
        return apiRegResp
    } catch (err) {
        throw err
    }
}


export async function login(data) {
    try {
        const apiLoginResp = await AuthAPI.loginUser(data)
        return apiLoginResp
    } catch (err) {
        throw err
    }
}