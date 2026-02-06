import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Space, message, Modal, Input, Card } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const AdminManagePostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
            setPosts(data);
        } catch (error) {
            message.error('Không thể tải danh sách bài viết.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = (slug) => {
        Modal.confirm({
            title: 'Bạn có chắc muốn xóa bài viết này?',
            content: 'Hành động này không thể hoàn tác.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    const { token } = JSON.parse(localStorage.getItem('userInfo'));
                    await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${slug}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    message.success('Xóa bài viết thành công!');
                    fetchPosts();
                } catch (error) {
                    message.error('Xóa bài viết thất bại.');
                }
            },
        });
    };
    
    // Cấu hình các cột cho bảng
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.title).toLowerCase().includes(value.toLowerCase());
            },
            render: (text, record) => <Link to={`/admin/edit-post/${record.slug}`}>{text}</Link>,
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            filters: [
                { text: 'Tin thị trường', value: 'market' },
                { text: 'Tin nội bộ', value: 'internal' },
                { text: 'Hoạt động cộng đồng', value: 'community' },
            ],
            onFilter: (value, record) => record.category.includes(value),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString('vi-VN'),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => navigate(`/admin/edit-post/${record.slug}`)}>Sửa</Button>
                    <Button type="primary" danger onClick={() => handleDelete(record.slug)}>Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <Card title="Quản lý bài viết" extra={
            <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => navigate('/admin/create-post')}
            >
                Viết bài mới
            </Button>
        }>
            <Input.Search 
                placeholder="Tìm kiếm theo tiêu đề..."
                onSearch={(value) => setSearchText(value)}
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                dataSource={posts}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );
};

export default AdminManagePostsPage;