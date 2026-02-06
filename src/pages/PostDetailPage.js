import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Hook để lấy tham số từ URL
import axios from "axios";
import "./PostDetailPage.css";

const PostDetailPage = () => {
  const { slug } = useParams(); // Lấy 'id' từ URL, ví dụ: /tin-tuc/12345 -> id = 12345
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL =
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://your-domain.com");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/posts/${slug}`);
        setPost(response.data);
      } catch (err) {
        setError("Không tìm thấy bài viết hoặc đã có lỗi xảy ra.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, API_BASE_URL]); // useEffect sẽ chạy lại mỗi khi 'id' trên URL thay đổi

  if (loading) return <p className="post-status">Đang tải bài viết...</p>;
  if (error) return <p className="post-status error">{error}</p>;
  if (!post) return <p className="post-status">Không tìm thấy bài viết.</p>;

  return (
    <div className="post-detail-container">
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        <span>Tác giả: {post.author}</span>
        <span>
          Ngày đăng: {new Date(post.createdAt).toLocaleDateString("vi-VN")}
        </span>
      </div>
      {post.featuredImage && (
        <img
          src={`${post.featuredImage}`}
          alt={post.title}
          className="post-featured-image"
        />
      )}
      {/* Dùng dangerouslySetInnerHTML để render HTML từ database một cách an toàn */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostDetailPage;
