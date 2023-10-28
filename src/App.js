import React from "react";
import ReactDOM from "react-dom/client";

const App = () => (
    <div className="app">
        <h1>Hello world</h1>
    </div>
);

console.log("run");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
