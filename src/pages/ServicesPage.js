import React, { useState } from 'react';
import DebtCollection from '../components/services/DebtCollection';
import AssetValuation from '../components/services/AssetValuation';
import AssetManagement from '../components/services/AssetManagement';
import './ServicesPage.css';

const ServicesPage = () => {
    // State để quản lý tab active, mặc định là 'debt'
    const [activeTab, setActiveTab] = useState('debt');

    // Hàm để render nội dung tương ứng
    const renderContent = () => {
        switch (activeTab) {
            case 'valuation':
                return <AssetValuation />;
            case 'management':
                return <AssetManagement />;
            case 'debt':
            default:
                return <DebtCollection />;
        }
    };

    return (
        <div className="services-page">
            <div className="services-tab-navigation">
                <div className="services-tab-container">
                    <button
                        className={`service-tab-link ${activeTab === 'debt' ? 'active' : ''}`}
                        onClick={() => setActiveTab('debt')}
                    >
                        <span className="service-tab-icon">💰</span>
                        THU HỒI NỢ
                    </button>
                    <button
                        className={`service-tab-link ${activeTab === 'valuation' ? 'active' : ''}`}
                        onClick={() => setActiveTab('valuation')}
                    >
                        <span className="service-tab-icon">⚖️</span>
                        TƯ VẤN THẨM ĐỊNH TÀI SẢN
                    </button>
                    <button
                        className={`service-tab-link ${activeTab === 'management' ? 'active' : ''}`}
                        onClick={() => setActiveTab('management')}
                    >
                        <span className="service-tab-icon">🏠</span>
                        QUẢN LÝ VÀ KHAI THÁC TÀI SẢN
                    </button>
                </div>
            </div>

            <div className="service-tab-content-area">
                {renderContent()}
            </div>
        </div>
    );
};

export default ServicesPage;