import React, { useState, useRef } from 'react';
import axios from 'axios';
import slugify from 'slugify';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, message, Card, Row, Col } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { Option } = Select;

const AdminCreatePostPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Giữ lại state và ref cho input file cũ
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

    const handleTitleChange = (e) => {
        const title = e.target.value;
        const newSlug = slugify(title, { lower: true, strict: true, locale: 'vi' });
        form.setFieldsValue({ slug: newSlug });
    };

    const handleSubmit = async (values) => {
        if (!content) {
            message.error('Vui lòng nhập nội dung bài viết!');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('content', content);
        formData.append('category', values.category);
        
        // Lấy file từ state thay vì từ 'values' của Form
        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, formData, config);
            message.success('Tạo bài viết thành công!');
            setTimeout(() => navigate('/admin/manage-posts'), 1500);
        } catch (error) {
            message.error(error.response?.data?.message || 'Tạo bài viết thất bại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page-container admin-edit-page-wide">
            <h1>Tạo bài viết mới</h1>
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
                        <Card title="Thông tin bổ sung & Xuất bản" bordered={false}>
                             <Row gutter={24}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="category" label="Danh mục" initialValue="market" rules={[{ required: true }]}>
                                        <Select>
                                            <Option value="community">Hoạt động cộng đồng</Option>
                                            <Option value="market">Tin thị trường</Option>
                                            <Option value="internal">Tin nội bộ</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                     <div className="ant-form-item">
                                         <div className="ant-form-item-label">
                                             <label htmlFor="image-input">Ảnh đại diện</label>
                                         </div>
                                         <div className="ant-form-item-control">
                                             <input
                                                 type="file"
                                                 id="image-input"
                                                 ref={fileInputRef}
                                                 onChange={(e) => setFeaturedImage(e.target.files[0])}
                                             />
                                         </div>
                                     </div>
                                </Col>
                             </Row>
                            <Form.Item style={{ marginTop: '20px' }}>
                                <Button type="primary" htmlType="submit" loading={loading} size="large">
                                    Đăng bài viết
                                </Button>
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AdminCreatePostPage;