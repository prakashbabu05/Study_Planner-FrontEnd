import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = `${user.name},${user.email},${user.password}`;

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: data
      });

      const result = await response.text();

      if (response.ok) {
        alert("Registered Successfully 🎉");

        setUser({
          name: "",
          email: "",
          password: ""
        });
      } else {
        alert("Error: " + result);
      }

    } catch (error) {
      alert("Server not reachable ❌");
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>

        </form>

        {/* 🔥 NAVIGATION FIX */}
        <p className="footer-note">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Sign in
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;