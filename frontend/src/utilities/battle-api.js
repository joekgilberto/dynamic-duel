const BASE_URL = process.env.REACT_APP_BATTLE_URL;

export async function create(data) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": tokens
      },
      body: JSON.stringify(data),
    };
  
    const res = await fetch(BASE_URL, config);
  
    console.log(res);
  
    if (res.ok) {
      return res.json();
    } else {
      console.log(res.statusText)
      throw new Error("Invalid Request");
    }
  }