import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// CSS
import "./App.css";

// --- Components & Layouts ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

// --- Pages ---
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ServicesPage from "./pages/ServicesPage";
import NewsPage from "./pages/NewsPage";
import PostDetailPage from "./pages/PostDetailPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import JobDetailPage from "./pages/JobDetailPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";

// --- Admin Pages ---
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminCreatePostPage from "./pages/AdminCreatePostPage";
import AdminCreateUserPage from "./pages/AdminCreateUserPage";
import AdminManagePostsPage from "./pages/AdminManagePostsPage";
import AdminEditPostPage from "./pages/AdminEditPostPage";
// Component Layout chính cho trang người dùng
const MainLayout = () => (
  <div className="App">
    <Header />
    <main className="main-content">
      <Outlet /> {/* Nơi các trang công khai sẽ hiển thị */}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho trang đăng nhập (layout riêng, không có Header/Footer) */}

        {/* Route cho khu vực Admin, được bảo vệ và sử dụng AdminLayout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* Các trang con của admin sẽ render bên trong Outlet của AdminLayout */}
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="create-post" element={<AdminCreatePostPage />} />
            <Route path="create-user" element={<AdminCreateUserPage />} />
            <Route path="manage-posts" element={<AdminManagePostsPage />} />
            <Route path="edit-post/:slug" element={<AdminEditPostPage />} />
            {/* Thêm các route admin khác ở đây */}
          </Route>
        </Route>

        {/* Route cho các trang người dùng (sử dụng MainLayout) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} /> {/* Trang chủ */}
          <Route path="ve-chung-toi" element={<AboutUsPage />} />
          <Route path="linh-vuc-hoat-dong" element={<ServicesPage />} />
          <Route path="tin-tuc" element={<NewsPage />} />
          <Route path="tin-tuc/:slug" element={<PostDetailPage />} />
          <Route path="tuyen-dung" element={<RecruitmentPage />} />
          <Route path="tuyen-dung/:slug" element={<JobDetailPage />} />
          <Route path="lien-he" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          {/* Route mặc định nếu không khớp, có thể tạo trang 404 */}
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
