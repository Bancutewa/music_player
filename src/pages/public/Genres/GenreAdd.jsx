import React, { memo, useState } from "react";
import { apiCreateGenre } from "../../../apis"; // Import API từ file axios
import {
  Form,
  Input,
  Upload,
  Button,
  Progress,
  Spin,
  Typography,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

const GenreAdd = () => {
  const [form] = Form.useForm();
  const [genreData, setGenreData] = useState({
    title: "",
    description: "",
    file: null, // File ảnh đại diện của genre
  });
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle file upload
  const handleFileChange =
    (name) =>
    ({ fileList }) => {
      setGenreData({
        ...genreData,
        [name]:
          fileList.length > 0 ? fileList[0].originFileObj : null,
      });
    };

  // Reset form and state
  const resetForm = () => {
    setGenreData({
      title: "",
      description: "",
      file: null,
    });
    form.resetFields();
    setUploadProgress(0);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", genreData.title);
    formData.append("description", genreData.description);
    if (genreData.file) formData.append("genre", genreData.file); // Sử dụng key "genre" để khớp với backend

    try {
      const response = await apiCreateGenre(formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      if (response?.success) {
        message.success("Genre created successfully!");
        alert("Genre added successfully!");
        resetForm(); // Reset form sau khi tạo thành công
      } else {
        message.error("Failed to create genre.");
      }
    } catch (error) {
      console.error("Error creating genre:", error);
      message.error(
        "An error occurred while uploading. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px" }}>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "24px" }}
      >
        Add New Genre
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={genreData}
        onValuesChange={(changedValues) =>
          setGenreData({ ...genreData, ...changedValues })
        }
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter a title" },
          ]}
        >
          <Input placeholder="Enter genre title" disabled={loading} />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter a description" },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Enter genre description"
            disabled={loading}
          />
        </Form.Item>

        {/* Genre Image */}
        <Form.Item label="Genre Image" name="file">
          <Upload
            beforeUpload={() => false} // Ngăn upload tự động, để xử lý trong handleSubmit
            onChange={handleFileChange("file")}
            accept="image/*"
            fileList={genreData.file ? [genreData.file] : []}
            disabled={loading}
          >
            <Button icon={<UploadOutlined />} disabled={loading}>
              Upload Genre Image
            </Button>
          </Upload>
        </Form.Item>

        {/* Upload Progress */}
        {loading && (
          <Form.Item label="Upload Progress">
            <Progress percent={uploadProgress} status="active" />
          </Form.Item>
        )}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              backgroundColor: "#13c2c2",
              borderColor: "#13c2c2",
            }}
          >
            {loading ? <Spin /> : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(GenreAdd);
