import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;
  // if (sessionUser) history.goBack();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      const signInErrors = {};
      for (let error of data) {
        if (error.startsWith("email")) {
          signInErrors.email = error.slice(8);
        } else if (error.startsWith("password")) {
          signInErrors.password = error.slice(11);
        }
      }
      setErrors(signInErrors);
      return;
    }
    history.goBack()
  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    history.goBack();
  };

  return (
    <div className="sign-up-page-whole">
      <div className="form-container">
        <h2 className="sign-in-header">Sign In To Worst Buy</h2>
        <div className="form-area">
          <form onSubmit={handleSubmit}>
            <div className="form-detail">
              <label className="input-box">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="email-box"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <p className="sign-in-errors">{errors.email}</p>
                )}
              </label>
              <label className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  className="password-box"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              {errors.password && (
                  <p className="sign-in-errors">{errors.password}</p>
              )}
              </label>
              <div className="button-area">
                <button type="submit" className="sign-in-button">
                  Sign In
                </button>
              </div>
            </div>
            <div className="terms-create-acc">
              <p className="disclosure">By continuing you agree to our Terms and Conditions, our Privacy Policy, and the My Worst Buy Program Terms.</p>
            </div>
            <div className="create-acc">
              <h4>Don't have an account? <Link className="sign-up-page" to='/signup'>Create an account</Link></h4>
            </div>
            <div onClick={demoUser} className="demo-card">
                <button className="demo-name">Demo User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
