import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./AdminDashboardPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Thêm state cho lỗi
  const API_BASE_URL =
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://your-domain.com");
  useEffect(() => {
    const fetchStats = async () => {
      // Lấy thông tin user một cách an toàn
      const userInfoString = localStorage.getItem("userInfo");
      if (!userInfoString) {
        setError(
          "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.",
        );
        setLoading(false);
        return;
      }

      try {
        const userInfo = JSON.parse(userInfoString);
        const token = userInfo.token;

        if (!token) {
          setError("Token không hợp lệ. Vui lòng đăng nhập lại.");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Đảm bảo URL là chính xác
        const { data } = await axios.get(
          `${API_BASE_URL}/api/stats/summary`,
          config,
        );
        setStats(data);
      } catch (err) {
        setError("Không thể tải dữ liệu thống kê. Vui lòng thử lại.");
        console.error("Lỗi khi tải thống kê:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [API_BASE_URL]); // Mảng rỗng đảm bảo useEffect chỉ chạy 1 lần

  if (loading) return <p>Đang tải thống kê...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>; // Hiển thị lỗi ra màn hình
  if (!stats) return <p>Không có dữ liệu thống kê.</p>;

  // ... (Phần code cho biểu đồ giữ nguyên)
  const chartData = {
    labels: ["Bài viết", "Tin tuyển dụng"],
    datasets: [
      {
        label: "Tổng số",
        data: [stats.posts.total, stats.jobs.total],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };
  // ...

  return (
    <div className="dashboard-page">
      <h1>Bảng điều khiển</h1>
      {/* ... (Phần code JSX cho thẻ và biểu đồ giữ nguyên) ... */}
      <div className="stats-cards-container">
        <div className="stat-card">
          <h2>Tổng số bài viết</h2>
          <p>{stats.posts.total}</p>
        </div>
        <div className="stat-card">
          <h2>Tổng số tin tuyển dụng</h2>
          <p>{stats.jobs.total}</p>
        </div>
      </div>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
