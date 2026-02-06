import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import slugify from 'slugify';
import { Form, Input, Button, Select, message, Card, Row, Col } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './AdminEditPostPage.css';

const { Option } = Select;

const AdminEditPostPage = () => {
    const { slug: postSlug } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(true);
    
    const [featuredImage, setFeaturedImage] = useState(null);
    const fileInputRef = useRef(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : '';

    const editorConfiguration = {
        simpleUpload: {
            uploadUrl: `${process.env.REACT_APP_API_URL}/api/uploads`,
            headers: { Authorization: `Bearer ${token}` }
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${postSlug}`);
                form.setFieldsValue({
                    title: data.title,
                    slug: data.slug,
                    category: data.category,
                });
                setContent(data.content);
                setCurrentImage(data.featuredImage);
            } catch (error) {
                message.error('Không tìm thấy bài viết.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug, form]);

    const handleTitleChange = (e) => {
        const title = e.target.value;
        const newSlug = slugify(title, { lower: true, strict: true, locale: 'vi' });
        form.setFieldsValue({ slug: newSlug });
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('content', content);
        formData.append('category', values.category);
        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        try {
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            await axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${postSlug}`, formData, config);
            message.success('Cập nhật bài viết thành công!');
            setTimeout(() => navigate('/admin/manage-posts'), 1500);
        } catch (error) {
            message.error(error.response?.data?.message || 'Cập nhật thất bại.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <div className="admin-page-container admin-edit-page-wide">
            <h1>Chỉnh sửa bài viết</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={24}>
                    <Col span={24}>
                        <Card title="Nội dung chính" bordered={false} style={{ marginBottom: 24 }}>
                            <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
                                <Input onChange={handleTitleChange} />
                            </Form.Item>
                            <Form.Item name="slug" label="Đường dẫn (Slug)" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Nội dung" required>
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={editorConfiguration}
                                    data={content}
                                    onChange={(event, editor) => setContent(editor.getData())}
                                />
                            </Form.Item>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="Thông tin bổ sung & Cập nhật" bordered={false}>
                            <Row gutter={24}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
                                        <Select>
                                            <Option value="community">HĐ cộng đồng</Option>
                                            <Option value="market">Tin thị trường</Option>
                                            <Option value="internal">Tin nội bộ</Option>
                                        </Select>
                                    </Form.Item>
                                     <div className="ant-form-item">
                                         <div className="ant-form-item-label"><label>Thay đổi ảnh đại diện</label></div>
                                         <div className="ant-form-item-control">
                                             <input
                                                 type="file"
                                                 ref={fileInputRef}
                                                 onChange={(e) => setFeaturedImage(e.target.files[0])}
                                             />
                                         </div>
                                     </div>
                                </Col>
                                <Col xs={24} md={12}>
                                    <div className="ant-form-item">
                                        <div className="ant-form-item-label"><label>Ảnh đại diện hiện tại</label></div>
                                        {currentImage && <img src={`${process.env.REACT_APP_API_URL}${currentImage}`} alt="Ảnh hiện tại" className="current-image-preview" />}
                                    </div>
                                </Col>
                            </Row>
                            <Form.Item style={{ marginTop: '20px' }}>
                                <Button type="primary" htmlType="submit" loading={loading} size="large">
                                    Cập nhật bài viết
                                </Button>
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AdminEditPostPage;