import React, { useState } from 'react';
import CommunityNews from '../components/news/CommunityNews';
import MarketNews from '../components/news/MarketNews';
import InternalNews from '../components/news/InternalNews';
import './NewsPage.css';

const NewsPage = () => {
    const [activeTab, setActiveTab] = useState('community');

    const renderContent = () => {
        switch (activeTab) {
            case 'market':
                return <MarketNews />;
            case 'internal':
                return <InternalNews />;
            case 'community':
            default:
                return <CommunityNews />;
        }
    };

    return (
        <div className="news-page">
            <div className="news-tab-navigation">
                <div className="news-tab-container">
                    <button
                        className={`news-tab-link ${activeTab === 'community' ? 'active' : ''}`}
                        onClick={() => setActiveTab('community')}
                    >
                        <span className="news-tab-icon">👥</span>
                        HOẠT ĐỘNG CỘNG ĐỒNG
                    </button>
                    <button
                        className={`news-tab-link ${activeTab === 'market' ? 'active' : ''}`}
                        onClick={() => setActiveTab('market')}
                    >
                        <span className="news-tab-icon">🏆</span>
                        TIN THỊ TRƯỜNG
                    </button>
                    <button
                        className={`news-tab-link ${activeTab === 'internal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('internal')}
                    >
                        <span className="news-tab-icon">📄</span>
                        TIN NỘI BỘ
                    </button>
                </div>
            </div>

            <div className="news-tab-content-area">
                {renderContent()}
            </div>
        </div>
    );
};

export default NewsPage;