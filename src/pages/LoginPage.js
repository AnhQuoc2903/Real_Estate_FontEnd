import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ API base URL (local + production)
  const API_BASE_URL =
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://YOUR-BACKEND-DOMAIN"); // 🔴 đổi thành domain backend thật

  // Nếu đã đăng nhập thì chuyển thẳng vào admin
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/admin/create-post");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Lưu user + token
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Chuyển trang sau khi login
      navigate("/admin/create-post");
    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.",
      );
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Đăng nhập Admin</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
