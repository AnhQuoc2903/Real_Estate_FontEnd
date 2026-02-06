import React, { useState, useEffect } from 'react';
import { getAllProperties } from '../services/api';
import { useTranslation } from 'react-i18next';
import './FeaturedProperties.css';

const FeaturedProperties = () => {
    const { t } = useTranslation();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Lấy 3 sản phẩm đầu tiên làm nổi bật
                const data = await getAllProperties();
                setProperties(data.slice(0, 3));
            } catch (error) {
                console.error("Lỗi:", error);
            }
        };
        fetchProperties();
    }, []);

    return (
        <section className="featured-properties">
            <div className="container">
                <h2>{t('featured.title')}</h2>
                <div className="properties-grid">
                    {properties.map((property) => (
                        <div key={property._id} className="property-card-featured">
                            {/* Bạn có thể thêm ảnh ở đây */}
                            <div className="card-content">
                                <h3>{property.title}</h3>
                                <p className="price">{property.price.toLocaleString('vi-VN')} VNĐ</p>
                                <p className="address">{property.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;