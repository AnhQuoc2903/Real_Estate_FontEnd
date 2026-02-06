import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // File CSS cho trang

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Kiểm tra nếu người dùng đã đăng nhập thì chuyển hướng đi
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/admin/create-post'); // Chuyển đến trang admin mặc định
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            // Gọi API đăng nhập
            const { data } = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password },
                config
            );

            // Lưu thông tin người dùng (bao gồm token) vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(data));

            // Chuyển hướng đến trang admin sau khi đăng nhập thành công
            navigate('/admin/create-post');

        } catch (err) {
            setError(err.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Đăng nhập Admin</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Đăng nhập</button>
            </form>
        </div>
    );
};

export default LoginPage;