import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api`;

export const getAllProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/properties`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bất động sản:", error);
    throw error;
  }
};
