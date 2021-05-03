import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from 'history';

import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const history = createBrowserHistory();

// Handle S3 redirects
const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
if (path) {
  history.replace(path);
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
