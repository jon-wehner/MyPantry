import { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import "./LoginForm.css"

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };
  const signInDemo = async (e) => {
    e.preventDefault(e)
    const user = await login('demo@aa.io', 'password')
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  }
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <div className="errors__container">
        {errors.map((error) => (
          <div className="error">{error}</div>
        ))}
      </div>
      <div className="formfield">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="formfield">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className="login__buttonContainer">
        <button type="submit">Login</button>
        <button id="demoLogin" type="none" onClick={signInDemo}>Demo User</button>
      </div>
    </form>
  );
};

export default LoginForm;
