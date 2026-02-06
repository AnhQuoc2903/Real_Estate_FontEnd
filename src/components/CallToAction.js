import React from 'react';
import './CallToAction.css';
import { useTranslation } from 'react-i18next';

const CallToAction = () => {
    const { t } = useTranslation();

    return (
        <section className="cta-section">
            <div className="container">
                <h2>{t('cta.title')}</h2>
                <p>{t('cta.subtitle')}</p>
                <button className="cta-button">{t('cta.button')}</button>
            </div>
        </section>
    );
};

export default CallToAction;