import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm({ login }){
  const initialState = { username: "", password: "" };
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const createdUserToken = await login(input);
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
    <div className="login-signup">
      <h1>Login</h1>
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <div className="auth-label-input">
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
          required
        />
        </div>
        <div className="auth-label-input">
        <label htmlFor="password">Password: </label>
        <input
        type="password"
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          required
        />
        </div>
        <button className="login-signup-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};