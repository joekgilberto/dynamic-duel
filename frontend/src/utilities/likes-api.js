import { getUserToken } from "./auth-token";

const BASE_URL = `${process.env.REACT_APP_LIKES_URL}`;

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

export async function update(id, updatedData) {
    const url = `${BASE_URL}/${id}`;

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`
        },
        body: JSON.stringify(updatedData),
    });

    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid PUT Request");
    }
}

export async function destroy(id) {
    const url = `${BASE_URL}/${id}`;

    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`
        }
    });

    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Request");
    }
}