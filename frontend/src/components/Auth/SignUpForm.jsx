import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpForm({ signUp, setReturningUser }) {
  const initialState = { username: "", password: "", confirmPassword: "" };
  const [input, setInput] = useState(initialState);
  const [incorrect, setIncorrect] = useState('')

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (input.password === input.confirmPassword) {
      const createdUserToken = await signUp(input);
      if (createdUserToken) {
        if (createdUserToken.token) {
          navigate("/");
        } else {
          navigate("/auth");
        }
        setInput(initialState);
      } else {
        setReturningUser(true)
      }
    } else {
      setIncorrect('Passwords do not match.')
    }
  }

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
        <div className="auth-label-input">

          <label className="signup-password" htmlFor="password">Password: </label>
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
        <div className="auth-label-input">
          <label className="signup-password" htmlFor="password">Confirm Password: </label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChange}
            minlength="8"
            required
          />
        </div>
        <p className="new-password">Password must have a minimum of eight (8) characters.</p>
        <div className="incorrect-div">
          <p className="incorrect">{incorrect}</p>
        </div>
        <button className="login-signup-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};
