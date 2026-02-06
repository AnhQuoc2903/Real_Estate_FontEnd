import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate(); // 1. Sử dụng hook useNavigate để chuyển hướng

    // 2. Tạo hàm xử lý đăng xuất
    const handleLogout = () => {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('userInfo');
        // Chuyển hướng người dùng về trang đăng nhập
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2 className="admin-logo">Admin Panel</h2>
                <nav className="admin-nav">
                    <Link to="/admin/dashboard">📊 Thống kê</Link>
                    <Link to="/admin/create-post">✍️ Tạo bài viết mới</Link>
                    <Link to="/admin/manage-posts">📋 Quản lý bài viết</Link>
                    <Link to="/admin/create-user">👤 Tạo tài khoản</Link>
                    {/* Thêm các link khác ở đây */}
                </nav>
                
                {/* 3. Thêm nút Đăng xuất và gọi hàm handleLogout khi nhấn */}
                <button onClick={handleLogout} className="logout-button">
                    Đăng xuất
                </button>
            </aside>
            <main className="admin-main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;