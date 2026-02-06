import React from 'react';
import './NewsSection.css';

// Dữ liệu mẫu cho các bài tin tức
const newsData = [
    {
        image: '/images/news/villa-1.jpg',
        title: 'HDAMC Hội thảo cập nhật quy định pháp luật mới',
        excerpt: 'HDAMC Hội thảo cập nhật quy định pháp luật mới',
        link: '/tin-tuc/bai-viet-1'
    },
    {
        image: '/images/news/villa-1.jpg',
        title: 'TRAO TẶNG HỌC BỔNG "QUỸ PHÚC TÂM" CHO HỌC SINH CÓ HOÀN CẢNH KHÓ KHĂN',
        excerpt: 'Trao tặng học bổng "Quỹ Phúc Tâm" cho học sinh có hoàn cảnh khó khăn',
        link: '/tin-tuc/bai-viet-2'
    },
    {
        image: '/images/news/villa-1.jpg',
        title: 'TIẾN LÊN VÀ ĐẬP LƯỚI: SỨC HÚT CỦA PICKLEBALL',
        excerpt: 'TIẾN LÊN VÀ ĐẬP LƯỚI: SỨC HÚT CỦA PICKLEBALL',
        link: '/tin-tuc/bai-viet-3'
    },
    {
        image: '/images/news/villa-1.jpg', // Thêm bài viết thứ 4
        title: 'HOẠT ĐỘNG THIỆN NGUYỆN TẠI MÁI ẤM TÌNH THƯƠNG',
        excerpt: 'Chung tay mang đến niềm vui và sự ấm áp cho các em nhỏ tại mái ấm tình thương.',
        link: '/tin-tuc/bai-viet-4'
    }
];

const NewsSection = () => {
    return (
        <section className="news-section">
            <div className="container">
                <h2 className="news-section-title">TIN TỨC</h2>
                <div className="news-grid">
                    {newsData.map((article, index) => (
                        <div key={index} className="news-card">
                            <img src={article.image} alt={article.title} className="news-card-image" />
                            <div className="news-card-content">
                                <h3>{article.title}</h3>
                                <p>{article.excerpt}</p>
                                <a href={article.link} className="news-read-more">
                                    Đọc tiếp →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;