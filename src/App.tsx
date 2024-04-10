import React from 'react';
import { initializeApp } from "firebase/app";
import Login from "./Pages/Login.tsx";

const firebaseConfig = {
  apiKey: "AIzaSyAYvEYcwXHATCmptKgXnKEbBF-BS7BFCss",
  authDomain: "web-game-4d168.firebaseapp.com",
  projectId: "web-game-4d168",
  storageBucket: "web-game-4d168.appspot.com",
  messagingSenderId: "927198535978",
  appId: "1:927198535978:web:68e5da7f3f89a897c77e53"
};

initializeApp(firebaseConfig);

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Login />
    </div>
  );
}

export default App;
