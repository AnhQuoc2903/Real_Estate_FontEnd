import React, { useState } from 'react';
import GeneralIntro from '../components/GeneralIntro';
import OrgStructure from '../components/OrgStructure';
import './AboutUsPage.css'; // File CSS cho trang

const AboutUsPage = () => {
    // State để quản lý tab nào đang active, mặc định là 'intro'
    const [activeTab, setActiveTab] = useState('intro');

    return (
        <div className="about-us-page">
            {/* Thanh điều hướng Tab */}
            <div className="tab-navigation">
                <div className="tab-container">
                    <button
                        className={`tab-link ${activeTab === 'intro' ? 'active' : ''}`}
                        onClick={() => setActiveTab('intro')}
                    >
                        {/* <span className="tab-icon">icon</span> */}
                        GIỚI THIỆU CHUNG
                    </button>
                    <button
                        className={`tab-link ${activeTab === 'org' ? 'active' : ''}`}
                        onClick={() => setActiveTab('org')}
                    >
                        {/* Thay thế text icon bằng một icon thực tế nếu có */}
                        {/* <span className="tab-icon">icon</span>  */}
                        CƠ CẤU TỔ CHỨC
                    </button>
                </div>
            </div>

            {/* Vùng hiển thị nội dung của Tab */}
            <div className="tab-content-area">
                {activeTab === 'intro' && <GeneralIntro />}
                {activeTab === 'org' && <OrgStructure />}
            </div>
        </div>
    );
};

export default AboutUsPage;