import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ToolBar from './components/ToolBar';
import { lazy, Suspense } from 'react'; 

const TimeSheet = lazy(() => import('rom/TimeSheet'));
const Projects = lazy(() => import('rom-project/Project'));


const Main = () => <div>Main</div>;
const Statement = () => <div>Statement</div>;
const FallBack = () => <div>Carregando...</div>;

const App = () => {
    return (
        <Router>
            <ToolBar user={{ email: 'teste@teste.com', level: 5 }} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/statement" element={<Statement />}/>
                <Route path="/projects" element={<Suspense fallback={<FallBack/>}><Projects /></Suspense>}/>

                <Route path="/timesheet" element={<Suspense fallback={<FallBack/>}><TimeSheet /></Suspense>}/>
            </Routes>
        </Router>
      )
};

export default App;