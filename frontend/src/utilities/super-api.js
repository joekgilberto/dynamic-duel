const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function index() {
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

export async function show(id) {
  const res = await fetch(BASE_URL+id, {
    method: "GET",
  });
  
  if (res.ok) {
    return res.json();
  } else {
    return new Error("Invalid Request");
  }
}

export async function search(string) {
  const res = await fetch(BASE_URL+'/search/'+string, {
    method: "GET",
  });
    
  if (res.ok) {
    return res.json();
  } else {
    return new Error("Invalid Request");
  }
}