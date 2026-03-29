import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/fluvius-styles.css";
import "./styles/extra_styles.css";
import "./basic.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { User_Provider } from "./context/user-context";

const cointainer = document.getElementById("root");
const root = createRoot(cointainer);
root.render(
  <User_Provider>
    <App />
  </User_Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
