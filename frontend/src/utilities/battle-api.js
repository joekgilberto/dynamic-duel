import { getUserToken } from "./auth-token";

const BASE_URL = `${process.env.REACT_APP_BATTLE_URL}/`;

export async function index() {
    const res = await fetch(BASE_URL, { method: "GET" });
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Request");
    }
}

export async function show(id) {
    const url = BASE_URL + id;
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

export async function create(data) {

    console.log("getUserToken()", getUserToken())
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        return res.json();
    } else {
        console.log(res)
        throw new Error("Invalid Request");
    }
}