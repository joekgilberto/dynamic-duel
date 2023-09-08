// src/utilities/auth-api.js
const BASE_URL = `${process.env.REACT_APP_AUTH_URL}`

export async function signUpUser(data){
    const url = `${BASE_URL}/signup`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options)
    if (response.ok) {
        return response.json()
    } else {
        throw new Error(response.statusText)
    }
}

export async function loginUser(data){

    const url = `${BASE_URL}/login`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options)
    if (response.ok) {
        return response.json()
    } else {
        throw new Error(response.statusText)
    }

}
