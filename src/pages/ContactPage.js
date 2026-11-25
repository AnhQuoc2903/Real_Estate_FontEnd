import React, { useState } from "react";
import axios from "axios";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("Đang gửi...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/contact`,
        formData,
      );

      setStatusMessage(response.data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatusMessage(
        error.response?.data?.message ||
          "Gửi tin nhắn thất bại. Vui lòng thử lại sau.",
      );
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* TIÊU ĐỀ */}
        <h1>Liên hệ với chúng tôi</h1>

        {/* GIỚI THIỆU CÔNG TY */}
        <div className="company-introduction">
          <h2>GIỚI THIỆU</h2>

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

        {/* KHU VỰC LIÊN HỆ */}
        <div className="contact-wrapper">
          {/* FORM LIÊN HỆ */}
          <div className="contact-form-container">
            <h2>Gửi tin nhắn</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Tên của bạn"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email của bạn"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Chủ đề"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                rows="6"
                placeholder="Nội dung tin nhắn"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">Gửi đi</button>
            </form>

            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </div>

          {/* THÔNG TIN LIÊN HỆ */}
          <div className="contact-info-container">
            <h2>THÔNG TIN LIÊN HỆ</h2>

            <p>
              <strong>Tên công ty:</strong>
              <br />
              CÔNG TY CỔ PHẦN ĐẦU TƯ DYNAMIC & DEVELOPMENT
            </p>

            <p>
              <strong>MST:</strong>
              <br />
              0316777466
            </p>

            <p>
              <strong>Địa chỉ:</strong>
              <br />
              Tầng 2, T8-33 Vinhomes Grand Park, Đường Phước Thiện, Khu phố
              Phước Thiện, Phường Long Bình, TP Hồ Chí Minh, Việt Nam
            </p>

            {/* BẢN ĐỒ */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps?q=Vinhomes%20Grand%20Park%2C%20Ph%C6%B0%E1%BB%9Bc%20Thi%E1%BB%87n%2C%20Long%20B%C3%ACnh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ vị trí Công ty Cổ phần Đầu tư Dynamic & Development"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
