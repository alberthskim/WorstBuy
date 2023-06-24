import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="nav-modal-button" onClick={openMenu}>
      {user ? (
        <div className="login-user-stuff">
          <i className="fas fa-user-circle" />
          <p>Hi, {user.firstName}</p>
        </div>

      ) : (

        <div className="login-user-stuff">
          <i className="fas fa-user-circle" />
          <p>Sign In</p>
        </div>
      )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="login-user">
            <li className="welcome">Hi, {user.firstName} {user.lastName}</li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className="nav-bar-area-button">
            <button className="login-button-nav" onClick={() => {
              closeMenu()
              history.push('/login')
              }}>Sign In</button>

            <button className="sign-up-button-nav" onClick={() => {
              closeMenu()
              history.push('/signup')
              }}>Create Account</button>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
