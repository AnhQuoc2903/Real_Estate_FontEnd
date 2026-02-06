import React from 'react';
import './AboutInfoSection.css';
import useIntersectionObserver from '../hooks/useIntersectionObserver'; // 1. Import hook

const AboutInfoSection = () => {
    // 2. Sử dụng hook để lấy ref và trạng thái isVisible
    const [sectionRef, isVisible] = useIntersectionObserver({
        threshold: 0.2 // Kích hoạt khi 20% section hiện ra
    });

    return (
        // 3. Gắn ref vào thẻ <section> cha
        <section className="about-info-section" ref={sectionRef}>
            <div className="about-info-container">
                {/* Cột nội dung bên trái */}
                {/* 4. Thêm class 'visible' khi isVisible là true */}
                <div className={`about-text-content ${isVisible ? 'visible' : ''}`}>
                    <h2 className="about-subtitle">VỀ CHÚNG TÔI</h2>
                    <p>
                        Công ty cổ phần Mua bán nợ và Quản lý tài sản HDBank (HDBank AMC) tiền thân là Công ty TNHH MTV Quản lý nợ
                        và khai thác tài sản – Ngân hàng TMCP Đại Á, được thành lập vào năm 2010 với vốn điều lệ ban đầu là 150 tỷ đồng...
                    </p>
                    <p>
                        Trước năm 2022, HDBank AMC là Công ty con 100% vốn trực thuộc trực thuộc HDBank. Đến ngày 23/3/2022,
                        HDBank AMC chính thức chuyển đổi mô hình...
                    </p>
                </div>

                {/* Cột hình ảnh bên phải */}
                <div className={`about-image-content ${isVisible ? 'visible' : ''}`}>
                    <img src="/images/villa.jpg" alt="Đội ngũ HDBank AMC" />
                </div>
            </div>
        </section>
    );
};

export default AboutInfoSection;