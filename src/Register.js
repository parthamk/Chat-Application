import React, { useState, useContext } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { LoginContext } from "./LoginContext";
import { Link } from "react-router-dom";
import Login from "./Login";
import logo192 from "./img/logo192.png";

const Register = () => {
    const {setUserLogin, setUserName}=useContext(LoginContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserName(email.substring(0, [5]));
        setUserLogin(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="login">
        <div className="formHeader">
          <img src={logo192} alt="LogoMain" />
          <h2>Chat Application</h2>
        </div>
      <div className="form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email here"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <div>
          <label htmlFor="password"> Confirm Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter the same password again"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <button id="submit-btn" onClick={signUp}>Signup</button>
        <p>Already have an account?</p>
        <Link to="/login">
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
