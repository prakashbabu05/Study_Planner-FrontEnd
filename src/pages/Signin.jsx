import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Signin() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
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

    const data = `${user.email},${user.password}`;

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: data
      });

      const result = await response.text();

      if (response.ok) {
        alert("Login Successful 🎉");
        navigate("/dashboard");   // 🚀 redirect
      } else {
        alert(result);
      }

    } catch (error) {
      alert("Server not reachable ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>

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

          <button type="submit">Login</button>

        </form>

        <p className="footer-note">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Create one
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signin;