import React, { useState } from 'react';
import axios from 'axios';
import './AdminCreateUserPage.css';

const AdminCreateUserPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Mặc định là 'user'
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const userData = { name, email, password, role };
        
        try {
            const { token } = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, userData, config);
            setMessage(`Tạo tài khoản ${role} thành công!`);
            // Reset form
            setName('');
            setEmail('');
            setPassword('');
            setRole('user');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Tạo tài khoản thất bại.');
        }
    };

    return (
        <div className="admin-page-container">
            <h1>Tạo tài khoản mới</h1>
            <form onSubmit={handleSubmit} className="admin-user-form">
                <div className="form-group">
                    <label htmlFor="name">Họ và tên</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Vai trò</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Tạo tài khoản</button>
            </form>
            {message && <p className="status-message">{message}</p>}
        </div>
    );
};

export default AdminCreateUserPage;