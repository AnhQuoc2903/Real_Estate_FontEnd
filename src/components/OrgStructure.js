import React from 'react';
import './OrgStructure.css';

const OrgStructure = () => {
    return (
        <div style={{ padding: '40px 15px', textAlign: 'center', minHeight: '50vh' }}>
            <h1>Cơ cấu tổ chức</h1>
            {/* <p>Nội dung và sơ đồ về cơ cấu tổ chức sẽ được hiển thị ở đây.</p> */}
            <img src="/images/org-chart.jpg" alt="Cơ cấu tổ chức" className='responsive-img'/>
        </div>
    );
};

export default OrgStructure;
