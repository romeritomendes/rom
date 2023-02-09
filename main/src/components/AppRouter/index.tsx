import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/Auth";
import { Login } from "../Login";
import { Logout } from "../Login/Logout";

import ToolBar from "../ToolBar";
import { ProtectElement } from "./ProtectedElement";

const TimeSheet = lazy(() => import("rom_timesheet/TimeSheet"));
const Projects = lazy(() => import("rom_project/Project"));

const Main = () => <div>Main</div>;
const Statement = () => <div>Statement</div>;
const FallBack = () => <div>Carregando...</div>;

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <ToolBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/logout"
            element={
              <ProtectElement>
                <Logout />
              </ProtectElement>
            }
          />
          <Route
            path="/"
            element={
              <ProtectElement>
                <Main />
              </ProtectElement>
            }
          />
          <Route
            path="/statement"
            element={
              <ProtectElement>
                <Statement />
              </ProtectElement>
            }
          />

          <Route
            path="/projects"
            element={
              <Suspense fallback={<FallBack />}>
                <ProtectElement>
                  <Projects />
                </ProtectElement>
              </Suspense>
            }
          />

          <Route
            path="/timesheet"
            element={
              <Suspense fallback={<FallBack />}>
                <ProtectElement>
                  <TimeSheet />
                </ProtectElement>
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
