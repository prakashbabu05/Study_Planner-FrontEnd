import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Sessions from "./pages/Sessions";
import Schedule from "./pages/Schedule";
import Progress from "./pages/Progress";

// NEW
import AIPlanner from "./pages/AIPlanner";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Signup */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Login */}
        <Route
          path="/signin"
          element={<Signin />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Subjects */}
        <Route
          path="/subjects"
          element={<Subjects />}
        />

        {/* Sessions */}
        <Route
          path="/sessions"
          element={<Sessions />}
        />

        {/* Schedule */}
        <Route
          path="/schedule"
          element={<Schedule />}
        />

        {/* Progress */}
        <Route
          path="/progress"
          element={<Progress />}
        />

        {/* AI Planner */}
        <Route
          path="/aiplanner"
          element={<AIPlanner />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;