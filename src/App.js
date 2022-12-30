import React from "react";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/Navbar";
import QuestionsPage from "./Pages/QuestionsPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programming-questions/:id" element={<QuestionsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
