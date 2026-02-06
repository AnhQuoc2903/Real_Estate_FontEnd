import React, { useState, useEffect } from 'react';
import './TestimonialsSection.css';

// Dữ liệu cho các nhận xét của khách hàng
const testimonialsData = [
    {
        quote: 'Nhân viên tư vấn và hỗ trợ rất nhiệt tình. Tôi cảm thấy rất vui, sẽ luôn ủng hộ HDBank AMC.',
        author: 'Nguyễn Xuân Thịnh'
    },
    {
        quote: 'Dịch vụ chuyên nghiệp và nhanh chóng. Mọi thắc mắc của tôi đều được giải đáp cặn kẽ. Rất hài lòng!',
        author: 'Trần Thị Mai'
    },
    {
        quote: 'Giải pháp tài chính mà HDBank AMC cung cấp đã giúp doanh nghiệp của tôi vượt qua giai đoạn khó khăn. Xin cảm ơn.',
        author: 'Lê Văn An'
    },
    {
        quote: 'Thủ tục đơn giản, minh bạch. Tôi chắc chắn sẽ giới thiệu dịch vụ cho bạn bè và người thân.',
        author: 'Phạm Hồng Nhung'
    }
];

const TestimonialsSection = () => {
    // State để theo dõi slide (nhận xét) nào đang hiển thị
    const [activeIndex, setActiveIndex] = useState(0);

    // Sử dụng useEffect để tự động chuyển slide sau mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            // Tăng index lên 1, nếu đến cuối thì quay lại 0
            setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        }, 5000); // 5000ms = 5 giây

        // Dọn dẹp interval khi component bị unmount
        return () => clearInterval(interval);
    }, []);

    const currentTestimonial = testimonialsData[activeIndex];

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonial-content">
                    <p className="testimonial-subtitle">KHÁCH HÀNG NGHĨ GÌ?</p>
                    <blockquote className="testimonial-quote">
                        “{currentTestimonial.quote}”
                    </blockquote>
                    <cite className="testimonial-author">_{currentTestimonial.author}_</cite>
                    
                    <div className="testimonial-dots">
                        {testimonialsData.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === activeIndex ? 'active' : ''}`}
                                // Cho phép người dùng nhấn vào dot để chuyển slide
                                onClick={() => setActiveIndex(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;