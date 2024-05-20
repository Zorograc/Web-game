import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../../public/style.css"


const Login: React.FC = () => {
  const auth = getAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

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
      .catch(() => {
        alert("Nepravilno vpisan e-poštni naslov ali prekratko geslo");
      });
  };
  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((cred) => {
        console.log("User logged in:", cred.user);
        navigate("/game");
      })
      .catch(() => {
        alert("Nepravilno uporabniško ime ali geslo");

      });
  };
  const handleContinueWithoutLogin = () => {
    navigate ("/game");
  }

  return (
    <div className="app">
      <div className ="transparent">
        <h1 className ="brtext">Registracija</h1>
      <form className="signup" onSubmit={handleSubmitSignup}>
      <label className ="brtext" htmlFor="email">Email:</label>
        <input className ="brtext" type="email" name="email" />
        <label className ="brtext" htmlFor="password">Geslo:</label>
        <input className ="brtext" type="password" name="password" />
        <button className ="brtext" type="submit">Registriraj se</button>
      </form>
      <h1 >Prijava</h1>
      <form className="login" onSubmit={handleSubmitLogin}>
        <label className ="brtext" htmlFor="loginemail">Email:</label>
        <input className ="brtext" type="email" name="loginemail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        <label className ="brtext" htmlFor="loginpassword">Geslo:</label>
        <input className ="brtext" type="password" name="loginpassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        <button className ="brtext" type="submit">Prijava</button>
      </form>


      <button onClick = {handleContinueWithoutLogin}>Igraj brez registracije </button>
    </div>
    </div>
  );
};

export default Login;
