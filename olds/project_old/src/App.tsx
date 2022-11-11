import React from "react";
import ReactDOM from "react-dom";

import { Project } from "./components/Project";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: project</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);
ReactDOM.render(<Project />, document.getElementById("app"));
