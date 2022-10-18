import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ToolBar from "romHead/ToolBar";
import TimeSheet from "romTimeSheet/TimeSheet";

import "./index.css";

const Main = () => <div>Main</div>;
const Statement = () => <div>Statement</div>;

const App = () => {
    return (
        <Router>
            <ToolBar user={{ email: 'teste@teste.com', level: 5 }} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/statement" element={<Statement />}/>

                <Route path="/timesheet" element={<TimeSheet />}/>
            </Routes>
        </Router>
      )
};
ReactDOM.render(<App />, document.getElementById("app"));
