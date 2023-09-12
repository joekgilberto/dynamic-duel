import { getUserToken } from "./auth-token";

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

export async function show(id) {
    const url = `${BASE_URL}/${id}`;
    const res = await fetch(url, {
        method: "GET",
    });
    if (res.ok) {
        return res.json();
    } else {
        console.log(res);
        throw new Error(res.statusText);
    }
}

export async function update(id,updatedData){
    const url = `${BASE_URL}/${id}`
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`
        },
        body: JSON.stringify(updatedData),
    }

    const response = await fetch(url, options)
    if (response.ok) {
        return response.json()
    } else {
        throw new Error(response.statusText)
    }
}
