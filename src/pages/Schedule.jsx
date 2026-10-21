import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Schedule.css";

function Schedule() {

  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);

  const [schedule, setSchedule] = useState({
    subject: "",
    topic: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {

    fetchSubjects();
    fetchSchedules();

  }, []);

  // =========================
  // FETCH SUBJECTS
  // =========================
  const fetchSubjects = async () => {

    try {

      const response =
        await fetch("http://localhost:8080/getsubjects");

      const data = await response.text();

      if (data) {

        const subjectArray = data
          .split(";")
          .filter(item => item)
          .map(item => {

            const values = item.split(",");

            return values[1];

          });

        setSubjects(subjectArray);

      }

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // FETCH SCHEDULES
  // =========================
  const fetchSchedules = async () => {

    try {

      const response =
        await fetch("http://localhost:8080/getschedules");

      const data = await response.text();

      if (data) {

        const scheduleArray = data
          .split(";")
          .filter(item => item)
          .map(item => {

            const values = item.split(",");

            return {

              id: values[0],
              subject: values[1],
              topic: values[2],
              date: values[3],
              startTime: values[4],
              endTime: values[5],
              status: values[6]

            };

          });

        setScheduleList(scheduleArray);

      }

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    setSchedule({

      ...schedule,
      [e.target.name]: e.target.value

    });

  };

  // =========================
  // ADD SCHEDULE
  // =========================
  const handleAddSchedule = async (e) => {

    e.preventDefault();

    if (
      !schedule.subject ||
      !schedule.topic ||
      !schedule.date ||
      !schedule.startTime ||
      !schedule.endTime
    ) {

      alert("Please fill all fields");
      return;

    }

    const data =
      `${schedule.subject},${schedule.topic},${schedule.date},${schedule.startTime},${schedule.endTime}`;

    try {

      const response = await fetch(
        "http://localhost:8080/addschedule",
        {

          method: "POST",

          headers: {
            "Content-Type": "text/plain"
          },

          body: data

        }
      );

      const result = await response.text();

      if (response.ok) {

        alert("Schedule Added Successfully 🎉");

        fetchSchedules();

        setSchedule({

          subject: "",
          topic: "",
          date: "",
          startTime: "",
          endTime: ""

        });

      } else {

        alert(result);

      }

    } catch (error) {

      console.log(error);

      alert("Server not reachable ❌");

    }
  };

  // =========================
  // COMPLETE SCHEDULE
  // =========================
  const handleComplete = async (id) => {

    try {

      const response = await fetch(
        "http://localhost:8080/completeschedule",
        {

          method: "POST",

          headers: {
            "Content-Type": "text/plain"
          },

          body: id.toString()

        }
      );

      const result = await response.text();

      if (response.ok) {

        // SUCCESS POPUP
        alert("Schedule Completed Successfully 🎉");

        // REFRESH LIST
        fetchSchedules();

      } else {

        alert(result);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error ❌");

    }
  };

  // =========================
  // DELETE SCHEDULE
  // =========================
  const handleDelete = async (id) => {

    try {

      const response = await fetch(
        "http://localhost:8080/deleteschedule",
        {

          method: "POST",

          headers: {
            "Content-Type": "text/plain"
          },

          body: id.toString()

        }
      );

      const result = await response.text();

      if (response.ok) {

        alert("Schedule Deleted Successfully 🗑");

        fetchSchedules();

      } else {

        alert(result);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error ❌");

    }
  };

  return (

    <div className="schedule-container">

      <div className="schedule-card">

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

        {/* TITLE */}
        <h1 className="title">
          📅 STUDY SCHEDULER
        </h1>

        <p className="subtitle">
          Plan your study smarter
        </p>

        {/* FORM */}
        <form
          className="schedule-form"
          onSubmit={handleAddSchedule}
        >

          {/* SUBJECT */}
          <select
            name="subject"
            value={schedule.subject}
            onChange={handleChange}
          >

            <option value="">
              Select Subject
            </option>

            {subjects.map((sub, index) => (

              <option
                key={index}
                value={sub}
              >
                {sub}
              </option>

            ))}

          </select>

          {/* TOPIC */}
          <input
            type="text"
            name="topic"
            placeholder="Enter Topic"
            value={schedule.topic}
            onChange={handleChange}
          />

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={schedule.date}
            onChange={handleChange}
          />

          {/* START TIME */}
          <input
            type="time"
            name="startTime"
            value={schedule.startTime}
            onChange={handleChange}
          />

          {/* END TIME */}
          <input
            type="time"
            name="endTime"
            value={schedule.endTime}
            onChange={handleChange}
          />

          {/* ADD BUTTON */}
          <button
            type="submit"
            className="add-btn"
          >
            + Add Schedule
          </button>

        </form>

        {/* SCHEDULE LIST */}
        <div className="schedule-history">

          <h2>📚 Scheduled Tasks</h2>

          {scheduleList.length === 0 ? (

            <p>No schedules added yet</p>

          ) : (

            scheduleList.map((item) => (

              <div
                key={item.id}
                className="schedule-item"
              >

                <h3>{item.subject}</h3>

                <p>
                  <strong>Topic:</strong> {item.topic}
                </p>

                <p>
                  <strong>Date:</strong> {item.date}
                </p>

                <p>
                  <strong>Time:</strong>
                  {" "}
                  {item.startTime} - {item.endTime}
                </p>

                {/* STATUS */}
                <span
                  className={
                    item.status === "Completed"
                      ? "completed-status"
                      : "pending-status"
                  }
                >
                  {item.status}
                </span>

                {/* BUTTONS */}
                <div className="schedule-buttons">

                  {/* COMPLETE */}
                  {item.status !== "Completed" && (

                    <button
                      type="button"
                      className="complete-btn"
                      onClick={() => handleComplete(item.id)}
                    >
                      ✅ Complete
                    </button>

                  )}

                  {/* DELETE */}
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );
}

export default Schedule;