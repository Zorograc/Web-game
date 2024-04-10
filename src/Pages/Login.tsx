import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';

const Login: React.FC = () => {
  const auth = getAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupForm = e.currentTarget;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("User created:", cred.user);
        signupForm.reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((cred) => {
        console.log("User logged in:", cred.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div id="app">
      <form className="signup" onSubmit={handleSubmitSignup}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Sign up</button>
      </form>

      <form className="login" onSubmit={handleSubmitLogin}>
        <label htmlFor="loginemail">Email:</label>
        <input type="email" name="loginemail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        <label htmlFor="loginpassword">Password:</label>
        <input type="password" name="loginpassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
