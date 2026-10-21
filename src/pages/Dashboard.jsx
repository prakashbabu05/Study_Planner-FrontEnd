import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  return (

    <div className="dash-container">

      {/* HEADER */}
      <div className="dash-header">

        <h1 className="dash-title">
          📚 Study Scheduler Dashboard
        </h1>

        <p className="dash-subtitle">
          Organize your learning journey efficiently
        </p>

      </div>

      {/* DASHBOARD GRID */}
      <div className="dash-grid">

        {/* SUBJECTS */}
        <div
          className="dash-card"
          onClick={() => navigate("/subjects")}
        >

          <div className="card-icon">
            📘
          </div>

          <h2>Subjects</h2>

          <p>
            Manage all your study subjects
          </p>

        </div>

        {/* SCHEDULE */}
        <div
          className="dash-card"
          onClick={() => navigate("/schedule")}
        >

          <div className="card-icon">
            🗓
          </div>

          <h2>Schedule</h2>

          <p>
            Create your daily study plans
          </p>

        </div>

        {/* SESSIONS */}
        <div
          className="dash-card"
          onClick={() => navigate("/sessions")}
        >

          <div className="card-icon">
            ⏰
          </div>

          <h2>Sessions</h2>

          <p>
            Track actual study sessions
          </p>

        </div>

        {/* PROGRESS */}
        <div
          className="dash-card"
          onClick={() => navigate("/progress")}
        >

          <div className="card-icon">
            📈
          </div>

          <h2>Progress</h2>

          <p>
            Monitor your improvement
          </p>

        </div>

        {/* AI PLANNER */}
        <div
          className="dash-card"
          onClick={() => navigate("/aiplanner")}
        >

          <div className="card-icon">
            🤖
          </div>

          <h2>AI Planner</h2>

          <p>
            Generate smart AI study plans
          </p>

        </div>

      </div>

      {/* LOGOUT */}
      <div className="logout-section">

        <button
          className="logout-btn"
          onClick={() => navigate("/signin")}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;