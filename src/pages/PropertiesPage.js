import React, { useState, useEffect } from 'react';
import { getAllProperties } from '../services/api';
import { useTranslation } from 'react-i18next'; // 1. Import hook

const PropertiesPage = () => {
    const { t } = useTranslation(); // 2. Lấy hàm t
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getAllProperties();
                setProperties(data);
            } catch (err) {
                setError(t('properties_page.error')); // Dùng t() cho thông báo lỗi
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, [t]); // Thêm [t] để component re-render khi ngôn ngữ thay đổi

    if (loading) {
        return <div>{t('properties_page.loading')}</div>; // Dùng t()
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>{t('properties_page.title')}</h2> {/* Dùng t() */}
            <div className="property-list">
                {properties.map((property) => (
                    <div key={property._id} className="property-card">
                        <h3>{property.title}</h3>
                        <p>{t('properties_page.price')}: {property.price.toLocaleString('vi-VN')} VNĐ</p>
                        <p>{t('properties_page.area')}: {property.area} m²</p>
                        <p>{t('properties_page.address')}: {property.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertiesPage;