import React, { useState, useRef } from "react";
import axios from "axios";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, message } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AdminCreatePostPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const editorConfig = {
    simpleUpload: {
      uploadUrl: `${process.env.REACT_APP_API_URL}/api/uploads/ckeditor`,
    },
  };

  // Tự sinh slug
  const handleTitleChange = (e) => {
    const slug = slugify(e.target.value, {
      lower: true,
      strict: true,
      locale: "vi",
    });
    form.setFieldsValue({ slug });
  };

  // Submit form
  const handleSubmit = async (values) => {
    if (!content) {
      message.error("Vui lòng nhập nội dung bài viết");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("content", content);
    formData.append("category", values.category);

    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, formData);
      message.success("Tạo bài viết thành công");
      navigate("/admin/manage-posts");
    } catch (error) {
      message.error("Lỗi tạo bài viết");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      {/* TIÊU ĐỀ */}
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
        <Input onChange={handleTitleChange} />
      </Form.Item>

      {/* SLUG */}
      <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      {/* NỘI DUNG */}
      <Form.Item label="Nội dung">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={content}
          onChange={(e, editor) => setContent(editor.getData())}
        />
      </Form.Item>

      {/* DANH MỤC */}
      <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="market">Thị trường</Select.Option>
          <Select.Option value="community">Cộng đồng</Select.Option>
          <Select.Option value="internal">Tin nội bộ</Select.Option>
        </Select>
      </Form.Item>

      {/* ẢNH ĐẠI DIỆN */}
      <Form.Item label="Ảnh đại diện">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            setFeaturedImage(file);
            setImagePreview(URL.createObjectURL(file));
          }}
        />

        {imagePreview && (
          <div style={{ marginTop: 12 }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "100%",
                maxWidth: 300,
                borderRadius: 8,
                border: "1px solid #ddd",
                display: "block",
              }}
            />

            {/* NÚT XOÁ ẢNH */}
            <Button
              danger
              size="small"
              style={{ marginTop: 8 }}
              onClick={() => {
                setFeaturedImage(null);
                setImagePreview(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              ❌ Xoá ảnh
            </Button>
          </div>
        )}
      </Form.Item>

      {/* SUBMIT */}
      <Button type="primary" htmlType="submit" loading={loading}>
        Đăng bài
      </Button>
    </Form>
  );
};

export default AdminCreatePostPage;
