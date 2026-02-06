import React from 'react';
import './PartnerSection.css'; // File CSS cho hiệu ứng

// Danh sách các đối tác. Bạn có thể thay đổi hoặc lấy từ API
const partners = [
    { id: 1, name: 'Partner 1', logoUrl: '/images/partners/DD.png' },
    { id: 2, name: 'Partner 2', logoUrl: '/images/partners/DD.png' },
    { id: 3, name: 'Partner 3', logoUrl: '/images/partners/DD.png' },
    { id: 4, name: 'Partner 4', logoUrl: '/images/partners/DD.png' },
    { id: 5, name: 'Partner 5', logoUrl: '/images/partners/DD.png' },
    { id: 6, name: 'Partner 6', logoUrl: '/images/partners/DD.png' },
];

const PartnerSection = () => {
    return (
        <section className="partner-section">
            <h2 className="partner-title">Đối tác của chúng tôi</h2>
            <div className="logo-scroller-container">
                <div className="logo-scroller">
                    {/* Mẹo để tạo hiệu ứng lặp vô hạn: 
                        Chúng ta render danh sách logo 2 LẦN.
                        Khi dải logo đầu tiên chạy hết, dải logo thứ hai đã ở sẵn vị trí để lấp vào,
                        tạo cảm giác không có điểm dừng.
                    */}
                    {[...partners, ...partners].map((partner, index) => (
                        <div className="logo-item" key={index}>
                            <img src={partner.logoUrl} alt={partner.name} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;