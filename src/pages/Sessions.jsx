import { useEffect, useState } from "react";
import "./Sessions.css";

function Sessions() {

  const [session, setSession] = useState({
    subject: "",
    duration: ""
  });

  const [sessions, setSessions] = useState([]);

  // =========================
  // LOAD SESSIONS
  // =========================
  const loadSessions = async () => {

    const response = await fetch(
      "http://localhost:8080/getsessions"
    );

    const data = await response.text();

    if (data.trim() === "") {
      setSessions([]);
      return;
    }

    const rows = data.split(";").filter(item => item !== "");

    const formatted = rows.map(row => {

      const values = row.split(",");

      return {
        id: values[0],
        subject: values[1],
        duration: values[2],
        status: values[3]
      };
    });

    setSessions(formatted);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {

    setSession({
      ...session,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // ADD SESSION
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    const data =
      `${session.subject},${session.duration}`;

    const response = await fetch(
      "http://localhost:8080/addsession",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: data
      }
    );

    const result = await response.text();

    alert(result);

    setSession({
      subject: "",
      duration: ""
    });

    loadSessions();
  };

  return (

    <div className="session-container">

      <div className="session-card">

        <h1>⏰ Study Sessions</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            value={session.subject}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="duration"
            placeholder="Duration in Minutes"
            value={session.duration}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Session
          </button>

        </form>

        <div className="session-list">

          {sessions.map((item) => (

            <div
              className="session-item"
              key={item.id}
            >

              <h3>{item.subject}</h3>

              <p>
                Duration: {item.duration} mins
              </p>

              <p>
                Status: {item.status}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Sessions;