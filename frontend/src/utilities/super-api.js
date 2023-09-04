const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function index() {
    // fetch -> fetch does not throw errors -> account for errors by throwing a new error
    let rando = Math.ceil(Math.random()*732)
    const res = await fetch(BASE_URL+rando, {
      method: "GET",
    });
    
    if (res.ok) {
      return res.json();
    } else {
      return new Error("Invalid Request");
    }
  }