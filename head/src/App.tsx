import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import ToolBar from './components/ToolBar';

import "./index.css";

const App = () => (
    <div className="container">
        <div>Name: head - SideBar:</div>
        <Router>
            <ToolBar user={{ email: 'teste@teste.com', level: 5 }} />
        </Router>
    </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
