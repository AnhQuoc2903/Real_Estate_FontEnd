import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // Sử dụng backend để tải các file dịch từ thư mục /public/locales
  .use(HttpApi)
  // Tự động phát hiện ngôn ngữ từ trình duyệt
  .use(LanguageDetector)
  // Kết nối i18n với React
  .use(initReactI18next)
  .init({
    // Ngôn ngữ mặc định nếu không phát hiện được
    fallbackLng: 'vi',
    // Bật chế độ debug trong quá trình phát triển
    debug: true,
    // Các ngôn ngữ được hỗ trợ
    supportedLngs: ['vi', 'en'],
    // Cấu hình cho backend
    backend: {
      // Đường dẫn tới file dịch
      // {{lng}} sẽ được thay bằng mã ngôn ngữ (vi, en)
      // {{ns}} sẽ là namespace (mặc định là 'translation')
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      // Thứ tự ưu tiên phát hiện ngôn ngữ
      order: ['cookie', 'localStorage', 'querystring', 'navigator', 'htmlTag'],
      // Nơi lưu lựa chọn ngôn ngữ của người dùng
      caches: ['cookie', 'localStorage'],
    },
    interpolation: {
      escapeValue: false, // React đã tự bảo vệ khỏi tấn công XSS
    },
  });

export default i18n;