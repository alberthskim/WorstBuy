import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const errors = {};
    if (!firstName || firstName.trim().length > 50 || firstName.trim().length < 2)
      errors.firstName = "First name must be between 2 characters and 50 characters";
    if (!lastName || lastName.trim().length > 50 || lastName.trim().length < 2)
      errors.lastName = "Last name must be between 2 characters and 50 characters";
    if (!emailValidation(email)) errors.email = "Not a valid email address";
    if (!password || password.length < 6)
      errors.password = "Password must be 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Password must match"
    if (!mobile || mobile.replace(/-/g, '').length !== 10) errors.mobile = "Must be a valid US Number"
    setErrors(errors);
  }, [firstName, lastName, email, password, confirmPassword, mobile]);

  if (sessionUser) return <Redirect to="/" />;

  const emailValidation = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!Object.values(errors).length) {
      if (password === confirmPassword) {
        await dispatch(signUp(firstName, lastName, email, password, mobile.replace(/-/g, '')));
        return history.push("/");
      }
    }
  };

    return (
      <div className="sign-up-page-whole">
        <div className="form2-container">
          <h2 className="sign-up-header">Create An Account</h2>
          <div className="form-area">
            <form onSubmit={handleSubmit}>
              <div className="form-detail">
                <label className="input-box">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="name-box"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {errors.firstName && submitted && (
                    <p className="sign-in-errors">{errors.firstName}</p>
                  )}
                </label>
                <label className="input-box">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="name-box"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  {errors.lastName && submitted && (
                    <p className="sign-in-errors">{errors.lastName}</p>
                  )}
                </label>
                <label className="input-box">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="email-box"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && submitted && (
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
                  {errors.password && submitted && (
                    <p className="sign-in-errors">{errors.password}</p>
                  )}
                </label>
                <label className="input-box">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="password-box"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {errors.confirmPassword && submitted && (
                    <p className="sign-in-errors">{errors.confirmPassword}</p>
                  )}
                </label>
                <label className="input-box">
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className="mobile-number"
                    value={mobile}
                    onChange={(e) => {
                      const input = e.target.value;
                      const formattedInput = input
                        .replace(/\D/g, "")
                        .slice(0, 10)
                        .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
                      setMobile(formattedInput);
                    }}
                    required
                  />
                  {errors.mobile && submitted && (
                    <p className="sign-in-errors">{errors.mobile}</p>
                  )}
                </label>
                <div className="button-area">
                  <button
                    type="submit"
                    className="sign-up-button"
                    onClick={handleSubmit}
                  >
                    Create An Account
                  </button>
                </div>
              </div>
              <div className="terms-create-acc">
                <p className="disclosure">
                  By continuing you agree to our Terms and Conditions, our
                  Privacy Policy, and the My Worst Buy Program Terms.
                </p>
              </div>
              <div className="create-acc">
                <h4>
                  Already have an account?<Link className="sign-up-page" to="/login"> Sign in</Link>
                </h4>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignupFormPage;
