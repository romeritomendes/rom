import React from "react";
import ReactDOM from "react-dom";
import TimeSheet from "./components/TimeSheet";

import "./index.css";

const App = () => (
  <div>
    <TimeSheet />
  </div>
);
ReactDOM.render(<TimeSheet />, document.getElementById("app"));
