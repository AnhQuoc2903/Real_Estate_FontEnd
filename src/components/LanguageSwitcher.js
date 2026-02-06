import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // File CSS để định dạng

const LanguageSwitcher = () => {
    // Lấy instance i18n từ hook useTranslation
    // i18n.changeLanguage(lang) là hàm để đổi ngôn ngữ
    // i18n.language là ngôn ngữ hiện tại (ví dụ: 'vi', 'en')
    const { i18n } = useTranslation();

    return (
        <div className="language-switcher">
            <button
                // Vô hiệu hóa nút nếu đang ở ngôn ngữ Tiếng Việt
                disabled={i18n.language === 'vi'}
                // Khi nhấn, đổi ngôn ngữ sang 'vi'
                onClick={() => i18n.changeLanguage('vi')}
            >
                VN
            </button>
            {/* <button
                // Vô hiệu hóa nút nếu đang ở ngôn ngữ Tiếng Anh
                disabled={i18n.language === 'en'}
                // Khi nhấn, đổi ngôn ngữ sang 'en'
                onClick={() => i18n.changeLanguage('en')}
            >
                EN
            </button> */}
        </div>
    );
};

export default LanguageSwitcher;