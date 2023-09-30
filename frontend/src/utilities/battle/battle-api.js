import { getUserToken } from "../auth/auth-token";

const BASE_URL = `${process.env.REACT_APP_BATTLE_URL}`;

export async function index() {
    const res = await fetch(BASE_URL, { method: "GET" });
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Request");
    }
}

export async function users(id) {
    const url = `${BASE_URL}/yours/${id}`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Request");
    }
}

export async function otherUsers(id) {
    const url = `${BASE_URL}/others/${id}`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Invalid Request");
    }
}

export async function show(id) {
    const url = `${BASE_URL}/detail/${id}`;
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

export async function update(id, updatedData) {
    const url = `${BASE_URL}/detail/${id}`;

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
    const url = `${BASE_URL}/detail/${id}`;

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