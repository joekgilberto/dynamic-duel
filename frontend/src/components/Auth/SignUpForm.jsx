import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpForm({ signUp }) {
  const initialState = { username: "", password: "" };
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const createdUserToken = await signUp(input);

    if (createdUserToken.token) {
      navigate("/");
    } else {
      navigate("/auth");
    }
    setInput(initialState);
  };

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-signup">
      <h1>Sign Up</h1>
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
        <div className="new-password">
          <div className="auth-label-input">

            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              minlength="8"
              required
            />
          </div>
          <p>Minimum of eight (8) characters.</p>
        </div>
        <button className="login-signup-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};
