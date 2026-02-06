import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// Bạn có thể tạo file CSS riêng cho trang này
// import './JobDetailPage.css';

const JobDetailPage = () => {
    const { slug } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs/${slug}`);
                setJob(response.data);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết công việc:", error);
            }
        };
        fetchJob();
    }, [slug]);

    if (!job) return <p className="loading-text">Đang tải...</p>;

    return (
        <div className="job-detail-page" style={{maxWidth: '900px', margin: '40px auto', padding: '0 15px'}}>
            <h1>{job.title}</h1>
            <div className="job-meta">
                <span><strong>Cấp bậc:</strong> {job.level}</span> | 
                <span><strong>Địa điểm:</strong> {job.location}</span>
            </div>
            <hr />
            <h3>Mô tả công việc</h3>
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
            <h3>Yêu cầu công việc</h3>
            <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
        </div>
    );
};

export default JobDetailPage;