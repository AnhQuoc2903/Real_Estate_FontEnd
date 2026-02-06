// src/services/api.js
import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://your-domain.com')
// Đây là địa chỉ của backend server bạn đã tạo
const API_URL = `${API_BASE_URL}/api`;

// Hàm để lấy tất cả bất động sản
export const getAllProperties = async () => {
    try {
        const response = await axios.get(`${API_URL}/properties`);
        return response.data; // Trả về mảng dữ liệu
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bất động sản:", error);
        throw error; // Ném lỗi ra để component có thể xử lý
    }
};

// Sau này bạn có thể thêm các hàm khác:
// export const getPropertyById = async (id) => { ... };
// export const createProperty = async (propertyData) => { ... };