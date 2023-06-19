import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./LoginForm.css";


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="sign-up-page-whole">
      <div className="form-container">
        <h3 className="sign-in-header">Sign In To Worst Buy</h3>
        <div className="form-area">
          <form onSubmit={handleSubmit}>
            {/* <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul> */}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
