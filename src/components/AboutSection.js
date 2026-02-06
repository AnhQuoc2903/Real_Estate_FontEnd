import React from 'react';
import './AboutSection.css';
import useIntersectionObserver from '../hooks/useIntersectionObserver'; // 1. Import hook

const AboutSection = () => {
    // 2. Sử dụng hook. isVisible sẽ là true khi section vào viewport
    const [sectionRef, isVisible] = useIntersectionObserver({
        threshold: 0.3 // Kích hoạt khi 20% của section hiện ra
    });

    const tabContent = {
        vision: 'Lĩnh vực mua bán nợ: mua bán khoản nợ, hỗ trợ xử lý khoản nợ...',
        mission: 'Lĩnh vực quản lý tài sản: mua bán tài sản; quản lý tài sản...'
    };
    const [activeTab, setActiveTab] = React.useState('vision');

    return (
        // 3. Gắn ref vào section cha
        <section className="about-section" ref={sectionRef}>
            <div className="about-container">
                {/* 4. Thêm class 'visible' một cách có điều kiện */}
                <div className={`about-image-column ${isVisible ? 'visible' : ''}`}>
                    <img src="/images/villa.jpg" alt="Về chúng tôi" />
                </div>

                <div className={`about-content-column ${isVisible ? 'visible' : ''}`}>
                    <p className="section-subtitle">VỀ CHÚNG TÔI</p>
                    <h2 className="section-title">Chúng tôi ở đây để giúp bạn.</h2>
                    <div className="about-tabs">
                        <button
                            className={`tab-button ${activeTab === 'vision' ? 'active' : ''}`}
                            onClick={() => setActiveTab('vision')}
                        >
                            TẦM NHÌN
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'mission' ? 'active' : ''}`}
                            onClick={() => setActiveTab('mission')}
                        >
                            SỨ MỆNH
                        </button>
                    </div>
                    <div className="tab-content">
                        <p>
                            {activeTab === 'vision' ? tabContent.vision : tabContent.mission}
                        </p>
                    </div>
                    <a href="/ve-chung-toi" className="read-more-link">
                        Đọc tiếp →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;