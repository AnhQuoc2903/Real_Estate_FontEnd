import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecruitmentPage.css';

const RecruitmentPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://your-domain.com')
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/jobs`);
                setJobs(response.data);
            } catch (error) {
                console.error("Lỗi khi tải tin tuyển dụng:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <p className="loading-text">Đang tải tin tuyển dụng...</p>;

    return (
        <div className="recruitment-page">
            <div className="container">
                <h1>Vị trí đang tuyển dụng</h1>
                <div className="job-list">
                    {jobs.length > 0 ? jobs.map(job => (
                        <div key={job._id} className="job-card">
                            <div className="job-card-info">
                                <h2>{job.title}</h2>
                                <p><strong>Cấp bậc:</strong> {job.level}</p>
                                <p><strong>Địa điểm:</strong> {job.location}</p>
                            </div>
                            <Link to={`/tuyen-dung/${job.slug}`} className="job-card-link">
                                Xem chi tiết
                            </Link>
                        </div>
                    )) : <p>Hiện tại chúng tôi không có vị trí nào đang tuyển dụng.</p>}
                </div>
            </div>
        </div>
    );
};

export default RecruitmentPage;