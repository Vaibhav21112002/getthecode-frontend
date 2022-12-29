import React from "react";
import Navbar from "./components/Navbar"
import CardContainer from "./components/CardContainer"
import QuestionList from "./components/QuestionList";

const App = () => {
    return (
    <div>
        <Navbar/>
        <CardContainer/>
        <QuestionList/>
    </div>
    );
};

export default App;
