const BASE_URL = `${process.env.REACT_APP_BATTLE_URL}/`;

export async function index() {
    const res = await fetch(BASE_URL, { method: "GET" });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
  }

export async function create(data) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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