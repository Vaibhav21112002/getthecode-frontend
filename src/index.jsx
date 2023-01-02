import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/CSS/index.css";
import App from "./App";
import CodeState from "./context/CodeState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <CodeState>
            <App />
        </CodeState>
    </React.StrictMode>
);
