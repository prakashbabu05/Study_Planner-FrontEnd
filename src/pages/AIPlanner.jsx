import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AIPlanner.css";

function AIPlanner() {

  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hours, setHours] = useState("");

  const [plan, setPlan] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // GENERATE AI PLAN
  // =========================
  const generatePlan = async () => {

    if (!subject || !examDate || !hours) {

      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/generateplan",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            subject: subject,
            examDate: examDate,
            hours: hours

          })

        }
      );

      const result = await response.text();

      console.log("AI Response:");
      console.log(result);

      if (response.ok) {

        setPlan(result);

      } else {

        alert("Failed to generate AI plan");
      }

    } catch (error) {

      console.log(error);

      alert("AI generation failed");
    }

    finally {

      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (

    <div className="ai-container">

      <div className="ai-card">

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

        {/* TITLE */}
        <h1 className="ai-title">
          🤖 AI STUDY PLANNER
        </h1>

        <p className="ai-subtitle">
          Generate smart study schedules using AI
        </p>

        {/* SUBJECT */}
        <input
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* EXAM DATE */}
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
        />

        {/* HOURS */}
        <input
          type="number"
          placeholder="Hours Per Day"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        {/* GENERATE BUTTON */}
        <button
          className="generate-btn"
          onClick={generatePlan}
        >

          {
            loading
              ? "Generating..."
              : "Generate AI Plan"
          }

        </button>

        {/* RESULT */}
        {
          plan && (

            <div className="plan-box">

              <h2>
                📘 AI Generated Plan
              </h2>

              <pre>{plan}</pre>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default AIPlanner;