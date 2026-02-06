import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('Đang gửi...');
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, formData);
            //const response = await axios.post('http://localhost:5001/api/contact', formData);
            setStatusMessage(response.data.message);
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } catch (error) {
            setStatusMessage(error.response?.data?.message || 'Gửi tin nhắn thất bại.');
        }
    };

    return (
        <div className="contact-page">
            <div className="container">
                <h1>Liên hệ với chúng tôi</h1>
                <div className="contact-wrapper">
                    <div className="contact-form-container">
                        <h2>Gửi tin nhắn</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="name" placeholder="Tên của bạn" value={formData.name} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Email của bạn" value={formData.email} onChange={handleChange} required />
                            <input type="text" name="subject" placeholder="Chủ đề" value={formData.subject} onChange={handleChange} required />
                            <textarea name="message" rows="6" placeholder="Nội dung tin nhắn" value={formData.message} onChange={handleChange} required></textarea>
                            <button type="submit">Gửi đi</button>
                        </form>
                        {statusMessage && <p className="status-message">{statusMessage}</p>}
                    </div>
                    <div className="contact-info-container">
                        <h2>Thông tin</h2>
                        <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
                        <p><strong>Điện thoại:</strong> (028) 1234 5678</p>
                        <p><strong>Email:</strong> info@tencongty.com</p>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447175402031!2d106.7022223147483!3d10.77699999232101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f49b91a7893%3A0x2324905f778a873!2zQml0ZXhjbyBGaW5hbmNpYWwgVG93ZXIsIDE5LTE5IEjhu5MgVMO5bmcgTeG6rXUsIELhur9uIE5naMOhLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1660467727820!5m2!1svi!2s"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Bản đồ vị trí công ty"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;