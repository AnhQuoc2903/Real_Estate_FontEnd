import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NewsSection.css";

const NewsSection = () => {
  const [activeTab, setActiveTab] = useState("community");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://YOUR-BACKEND-DOMAIN");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/posts?category=${activeTab}&limit=4`,
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Lỗi tải tin tức:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_BASE_URL, activeTab]);

  return (
    <section className="news-section">
      <div className="container">
        <h2 className="news-section-title">TIN TỨC</h2>

        {/* ===== TAB NAVIGATION ===== */}
        <div className="news-tab-navigation">
          <button
            className={`news-tab-link ${
              activeTab === "community" ? "active" : ""
            }`}
            onClick={() => setActiveTab("community")}
          >
            👥 HOẠT ĐỘNG CỘNG ĐỒNG
          </button>

          <button
            className={`news-tab-link ${
              activeTab === "market" ? "active" : ""
            }`}
            onClick={() => setActiveTab("market")}
          >
            🏆 TIN THỊ TRƯỜNG
          </button>

          <button
            className={`news-tab-link ${
              activeTab === "internal" ? "active" : ""
            }`}
            onClick={() => setActiveTab("internal")}
          >
            📄 TIN NỘI BỘ
          </button>
        </div>

        {/* ===== CONTENT ===== */}
        {loading ? (
          <p>Đang tải tin tức...</p>
        ) : (
          <div className="news-grid">
            {posts.map((post) => (
              <div key={post._id} className="news-card">
                <img
                  src={
                    post.featuredImage?.startsWith("http")
                      ? post.featuredImage
                      : `${API_BASE_URL}${post.featuredImage}`
                  }
                  alt={post.title}
                  className="news-card-image"
                />

                <div className="news-card-content">
                  <h3>{post.title}</h3>

                  <p>
                    {post.content?.replace(/<[^>]+>/g, "").substring(0, 100)}
                    ...
                  </p>

                  <Link to={`/tin-tuc/${post.slug}`} className="news-read-more">
                    Đọc tiếp →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
