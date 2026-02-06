import React from 'react';
import './Services.css';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t } = useTranslation();

    return (
        <section className="services-section">
            <div className="container">
                <h2>{t('services.title')}</h2>
                <p className="section-subtitle">{t('services.subtitle')}</p>
                <div className="services-grid">
                    {/* Service Item 1 */}
                    <div className="service-item">
                        <div className="service-icon">🔍</div>
                        <h3>{t('services.item1_title')}</h3>
                        <p>{t('services.item1_desc')}</p>
                    </div>
                    {/* Service Item 2 */}
                    <div className="service-item">
                        <div className="service-icon">🏠</div>
                        <h3>{t('services.item2_title')}</h3>
                        <p>{t('services.item2_desc')}</p>
                    </div>
                    {/* Service Item 3 */}
                    <div className="service-item">
                        <div className="service-icon">⚖️</div>
                        <h3>{t('services.item3_title')}</h3>
                        <p>{t('services.item3_desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;