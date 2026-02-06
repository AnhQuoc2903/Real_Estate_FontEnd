import React from 'react';
import './ServicesSection.css'; // File CSS để định dạng

// Đây là nơi bạn sẽ quản lý dữ liệu cho các dịch vụ.
// Sau này bạn có thể lấy dữ liệu này từ API.
const servicesData = [
    {
        image: '/images/villa.jpg',
        title: 'THU HỒI NỢ',
        description: 'Đây là mảng kinh doanh chính của HDBank AMC do đó HDBank AMC đã và đang tập trung toàn bộ nguồn lực của mình để nâng cao chất lượng của việc thu hồi nợ một cách chuyên nghiệp nhất so với các đơn vị đang thực hiện trên thị trường thông qua nhiều biện pháp nghiệp vụ thu hồi nợ cho khách hàng',
        link: '/thu-hoi-no'
    },
    {
        image: '/images/villa.jpg',
        title: 'TƯ VẤN XỬ LÝ NỢ, TÀI SẢN',
        description: 'Với một bộ máy chuyên nghiệp, HDBank AMC đảm bảo sẽ đưa ra các giải pháp phù hợp cho việc xử lý nợ, tài sản, góp phần giảm thiểu nợ xấu, lành mạnh và minh bạch hóa tình hình tài chính, đảm bảo phát triển an toàn vốn cho khách hàng',
        link: '/tu-van-xu-ly-no'
    },
    {
        image: '/images/villa.jpg',
        title: 'QUẢN LÝ VÀ KHAI THÁC TÀI SẢN',
        description: 'Với kinh nghiệm nhiều năm hoạt động trong lĩnh vực vực tài chính, HDBank AMC sẽ cung cấp tốt cho khách hàng dịch vụ thẩm định các tài sản bao gồm: tài sản thế chấp, tài sản đảm bảo, các tài sản khác của khách hàng có nhu cầu ... một cách chính xác mà nhanh nhất mà khó có đơn vị nào thị trường có thể cung cấp',
        link: '/quan-ly-tai-san'
    },
    {
        image: '/images/villa.jpg',
        title: 'TƯ VẤN THẨM ĐỊNH TÀI SẢN',
        description: 'Với lợi thế có kinh nghiệm nhiều năm hoạt động trong lĩnh vực tài chính, HDBank AMC sẽ cung cấp tốt cho khách hàng dịch vụ thẩm định các tài sản bao gồm: tài sản thế chấp, tài sản đảm bảo ... một cách chính xác mà nhanh nhất mà khó có đơn vị nào thị trường có thể cung cấp',
        link: '/tham-dinh-tai-san'
    }
];

const ServicesSection = () => {
    return (
        <section className="services-section-container">
            <div className="container">
                <div className="section-header">
                    <p className="section-subtitle">DỊCH VỤ CỦA CHÚNG TÔI</p>
                    <h2 className="section-title">Mang hạnh phúc lại cho bạn</h2>
                </div>
                <div className="services-grid-layout">
                    {servicesData.map((service, index) => (
                        <div key={index} className="service-card-item">
                            <div className="service-image-wrapper">
                                <img src={service.image} alt={service.title} />
                            </div>
                            <div className="service-content-wrapper">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <a href={service.link} className="learn-more-link">
                                    Tìm hiểu thêm →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;