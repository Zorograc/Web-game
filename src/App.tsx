import React from 'react';
import { initializeApp } from "firebase/app";
import Login from "./Pages/Login.tsx";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Game from "./Pages/Game.tsx";
import ScoreBoard from "./Pages/ScoreBoard.tsx";


const firebaseConfig = {
  apiKey: "AIzaSyAYvEYcwXHATCmptKgXnKEbBF-BS7BFCss",
  authDomain: "web-game-4d168.firebaseapp.com",
  projectId: "web-game-4d168",
  storageBucket: "web-game-4d168.appspot.com",
  messagingSenderId: "927198535978",
  appId: "1:927198535978:web:68e5da7f3f89a897c77e53"
};

initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} /> 
        <Route path="/scoreboard" element={<ScoreBoard />} /> 
      </Routes>
    </Router>
  );
}


export default App;
