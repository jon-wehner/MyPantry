import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../store/session';
import './AuthForm.css';

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(login(email, password));
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };
  const startSignup = () => {
    history.push({
      pathname: '/sign-up',
      state: {
        tempEmail: email,
      },
    });
  };
  const signInDemo = async (e) => {
    e.preventDefault(e);
    await dispatch(login('demo@aa.io', 'password'));
    setAuthenticated(true);
  };
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
    <form className="loginForm" onSubmit={onLogin}>
      <div className="errors__container">
        {errors.map((error) => (
          <div className="error">{error}</div>
        ))}
      </div>
      <div className="signup__link">
        <span>
          Don&apos;t have an account?
          {' '}
          <button type="button" id="signuplink" onClick={startSignup}>Sign up.</button>
        </span>
      </div>
      <div className="formfield">
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </label>
      </div>
      <div className="formfield">
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </label>
      </div>
      <div className="login__buttonContainer">
        <button type="submit">Login</button>
        <button id="demoLogin" type="button" onClick={signInDemo}>Demo User</button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default LoginForm;
