import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // 1. Đọc dữ liệu từ localStorage
    const userInfoString = localStorage.getItem('userInfo');
    
    // 2. Kiểm tra xem dữ liệu có tồn tại không
    if (userInfoString) {
        // 3. Parse dữ liệu JSON và kiểm tra xem có token không
        const userInfo = JSON.parse(userInfoString);
        if (userInfo && userInfo.token) {
            // Nếu có token, cho phép render các trang con (admin pages)
            return <Outlet />;
        }
    }

    // 4. Nếu không thỏa mãn các điều kiện trên, chuyển hướng về trang đăng nhập
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;