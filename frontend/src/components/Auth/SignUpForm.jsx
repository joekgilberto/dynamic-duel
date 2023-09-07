import "./SignUpForm.css"

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpForm({ signUp }){
  const initialState = { username: "", password: "" };
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const createdUserToken = await signUp(input);

    if (createdUserToken.token) {
      navigate("/");
    } else {
      navigate("/auth");
    }
    setInput(initialState);
  };

  function handleChange(e){
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
};
