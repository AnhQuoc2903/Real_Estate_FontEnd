import React from 'react';
import './HeroSection.css';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>{t('hero.title')}</h1>
                <p>{t('hero.subtitle')}</p>                
            </div>
        </section>
    );
};

export default HeroSection;