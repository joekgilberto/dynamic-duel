import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpForm({ signUp, setReturningUser }) {
  const initialState = { username: "", password: "", confirmPassword: "" };
  const [input, setInput] = useState(initialState);
  const [incorrect, setIncorrect] = useState(null)

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (input.password === input.confirmPassword) {
      const createdUserToken = await signUp(input);
      if (createdUserToken) {
        if (createdUserToken.token) {
          navigate("/");
        } else {
          setInput(initialState)
          setIncorrect('Sign Up Error: Please try again.');
        }
        setInput(initialState);
      } else {
        setReturningUser(true)
      }
    } else {
      setInput(initialState)
      setIncorrect('Sign Up Error: Passwords do not match.')
    }
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-signup">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-label-input">

          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            value={input.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="signup-label-input">

          <label className="signup-password" htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            value={input.password}
            onChange={handleChange}
            minlength="8"
            required
          />
        </div>
        <div className="signup-label-input">
          <label className="signup-password" htmlFor="password">Confirm Password: </label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={input.confirmPassword}
            onChange={handleChange}
            minlength="8"
            required
          />
        </div>
        <p className="new-password">Password must have a minimum of eight (8) characters.</p>
        {incorrect ?
          <div className="incorrect-signup">
            <p className="incorrect">{incorrect}</p>
          </div>
          : null}
        <button className="login-signup-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};
