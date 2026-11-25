import React from "react";
import "./AboutInfoSection.css";
import useIntersectionObserver from "../hooks/useIntersectionObserver"; // 1. Import hook

const AboutInfoSection = () => {
  // 2. Sử dụng hook để lấy ref và trạng thái isVisible
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.2, // Kích hoạt khi 20% section hiện ra
  });

  return (
    <section className="about-info-section" ref={sectionRef}>
      <div className="about-info-container">
        <div className={`about-text-content ${isVisible ? "visible" : ""}`}>
          <h2 className="about-subtitle">VỀ CHÚNG TÔI</h2>
          <p>
            CÔNG TY CỔ PHẦN ĐẦU TƯ DYNAMIC & DEVELOPMENT là đơn vị hoạt động
            trong lĩnh vực đầu tư, mua bán nợ thị trường và tái cơ cấu tài sản.
            Công ty tập trung nghiên cứu, tiếp nhận và triển khai các phương án
            đầu tư, xử lý khoản nợ, tài sản có tiềm năng, đồng thời xây dựng
            giải pháp phù hợp với đặc điểm và giá trị của từng khoản nợ, tài
            sản.
          </p>

          <p>
            Thông qua hoạt động mua bán và tái cơ cấu, Dynamic & Development
            hướng tới khơi thông giá trị, tái cấu trúc, đầu tư, nâng cao hiệu
            quả khai thác và tối ưu giá trị thu hồi của các khoản nợ và tài sản.
          </p>
        </div>

        {/* Cột hình ảnh bên phải */}
        <div className={`about-image-content ${isVisible ? "visible" : ""}`}>
          <img src="/images/villa.jpg" alt="Đội ngũ Dynamic & Development" />
        </div>
      </div>
    </section>
  );
};

export default AboutInfoSection;
