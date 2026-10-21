import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Subjects.css";

function Subjects() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("High");

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    const res = await fetch("http://localhost:8080/getsubjects");
    const data = await res.text();

    if (data !== "") {
      const rows = data.split(";").filter((item) => item !== "");

      const arr = rows.map((row) => {
        const col = row.split(",");

        return {
          id: col[0],
          name: col[1],
          priority: col[2]
        };
      });

      setSubjects(arr);
    }
  };

  const addSubject = async () => {
    const data = `${name},${priority}`;

    await fetch("http://localhost:8080/addsubject", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: data
    });

    setName("");
    setPriority("High");

    loadSubjects();
  };

  return (
    <div className="subject-page">

      <div className="top-bar">
        <button onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <h1>📘 Subjects Manager</h1>
      </div>

      <div className="subject-box">

        <div className="form-box">

          <input
            type="text"
            placeholder="Enter Subject Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={addSubject}>➕ Add Subject</button>

        </div>

        <h2>Total Subjects: {subjects.length}</h2>

        <div className="subject-list">

          {subjects.map((sub) => (
            <div className="subject-card" key={sub.id}>
              <h3>{sub.name}</h3>
              <p>Priority: {sub.priority}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Subjects;