import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Dùng để tạo link "Đọc tiếp"
import './NewsList.css'; // File CSS chung cho danh sách tin tức

const CommunityNews = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://your-domain.com');
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Gọi API để lấy bài viết thuộc danh mục 'community'
                const response = await axios.get(`${API_BASE_URL}/api/posts?category=community`);
                setPosts(response.data);
            } catch (err) {
                setError('Không thể tải tin tức. Vui lòng thử lại sau.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); // Mảng rỗng [] đảm bảo hàm chỉ chạy 1 lần khi component được render

    if (loading) return <p>Đang tải tin tức cộng đồng...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (posts.length === 0) return <p>Chưa có bài viết nào trong mục này.</p>;

    return (
        <div className="news-list-grid">
            {posts.map((post) => (
                <div key={post._id} className="news-card">
                    {/* Đường dẫn ảnh cần được server backend cung cấp */}
                    <img src={`${API_BASE_URL}${post.featuredImage}`} alt={post.title} className="news-card-image" />
                    <div className="news-card-content">
                        <h3>{post.title}</h3>
                        {/* Lấy 100 ký tự đầu tiên của nội dung làm đoạn trích */}
                        <p>{post.content.replace(/<[^>]+>/g, '').substring(0, 100)}...</p>
                        <Link to={`/tin-tuc/${post.slug}`} className="news-read-more">
                            Đọc tiếp →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommunityNews;