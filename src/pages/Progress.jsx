import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Progress.css";

function Progress() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    completed: 0,
    pending: 0,
    progress: 0
  });

  // =====================================
  // FETCH PROGRESS DATA
  // =====================================
  const fetchProgress = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/progress"
      );

      const result = await response.text();

      const values = result.split(",");

      setData({

        totalSessions: values[0],

        totalMinutes: values[1],

        completed: values[2],

        pending: values[3],

        progress: values[4]

      });

    } catch (error) {

      console.log(error);

    }
  };

  // =====================================
  // AUTO LOAD
  // =====================================
  useEffect(() => {

    fetchProgress();

    // AUTO REFRESH EVERY 2 SECONDS
    const interval = setInterval(() => {

      fetchProgress();

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="progress-container">

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="progress-title">
        📈 STUDY PROGRESS
      </h1>

      {/* CARDS */}
      <div className="progress-grid">

        {/* TOTAL SESSIONS */}
        <div className="progress-card">

          <h2>
            📚 Total Sessions
          </h2>

          <p>
            {data.totalSessions}
          </p>

        </div>

        {/* TOTAL MINUTES */}
        <div className="progress-card">

          <h2>
            ⏱ Total Minutes
          </h2>

          <p>
            {data.totalMinutes}
          </p>

        </div>

        {/* COMPLETED */}
        <div className="progress-card">

          <h2>
            ✅ Completed
          </h2>

          <p>
            {data.completed}
          </p>

        </div>

        {/* PENDING */}
        <div className="progress-card">

          <h2>
            🕒 Pending
          </h2>

          <p>
            {data.pending}
          </p>

        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="progress-bar-section">

        <h2>
          Overall Progress
        </h2>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${data.progress}%`
            }}
          >

            {data.progress}%

          </div>

        </div>

      </div>

    </div>
  );
}

export default Progress;