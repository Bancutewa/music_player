import React, { memo, useEffect, useState } from "react";
import { apiCreateGenre, apiGetAllSongs } from "../../../apis";
import {
  Form,
  Input,
  Upload,
  Button,
  Progress,
  Spin,
  Typography,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2"; // Import SweetAlert2

const { Title } = Typography;
const { TextArea } = Input;

const GenreAdd = () => {
  const [form] = Form.useForm();
  const [genreData, setGenreData] = useState({
    title: "",
    description: "",
    songs: [],
    file: null,
  });
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await apiGetAllSongs();
      if (response.success) {
        setSongs(response.data);

        setErrorMessage(null);
      } else {
        setSongs([]);
        setErrorMessage(response.message || "Failed to fetch songs.");
        Swal.fire(
          "Oops! Something went wrong",
          response.message || "Failed to fetch songs.",
          "error"
        );
      }
    } catch (error) {
      setSongs([]);
      const errorMsg = error.message || "Error fetching songs.";
      setErrorMessage(errorMsg);
      Swal.fire("Oops! Something went wrong", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Handle file upload
  const handleFileChange = ({ fileList }) => {
    const file =
      fileList.length > 0 ? fileList[0].originFileObj : null;
    setGenreData({
      ...genreData,
      file,
    });
    form.setFieldsValue({ file });
  };

  // Reset form and state
  const resetForm = () => {
    setGenreData({
      title: "",
      description: "",
      songs: [],
      file: null,
    });
    form.resetFields();
    form.setFieldsValue({
      title: "",
      description: "",
      songs: [],
      file: null,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setUploadProgress(0);
    setErrorMessage(null);
    console.log(genreData);

    try {
      await form.validateFields();
      const formData = new FormData();
      formData.append("title", genreData.title);
      formData.append("description", genreData.description);
      formData.append("songs", genreData.songs.join(","));
      if (genreData.file) formData.append("genre", genreData.file);

      const response = await apiCreateGenre(formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (response?.success) {
        Swal.fire(
          "Success!",
          "Genre created successfully",
          "success"
        );
        resetForm();
      } else {
        setErrorMessage(
          response?.message || "Failed to create genre."
        );
        Swal.fire(
          "Oops! Something went wrong",
          response?.message || "Failed to create genre.",
          "error"
        );
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while uploading. Please try again.";
      setErrorMessage(errorMsg);
      Swal.fire("Oops! Something went wrong", errorMsg, "error");
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
      {errorMessage && (
        <Typography.Text
          type="danger"
          style={{ display: "block", marginBottom: "16px" }}
        >
          {errorMessage}
        </Typography.Text>
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title: "",
          description: "",
          songs: [],
          file: null,
        }}
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter a title" },
          ]}
        >
          <Input
            placeholder="Enter genre title"
            disabled={loading}
            onChange={(e) =>
              setGenreData({ ...genreData, title: e.target.value })
            }
          />
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
            onChange={(e) =>
              setGenreData({
                ...genreData,
                description: e.target.value,
              })
            }
          />
        </Form.Item>

        {/* Songs */}
        <Form.Item
          label="Song"
          name="songs"
          rules={[
            { required: true, message: "Please select a song" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select songs"
            disabled={loading}
            allowClear
            onChange={(value) =>
              setGenreData({ ...genreData, songs: value })
            }
          >
            {songs.map((song) => (
              <Select.Option key={song._id} value={song._id}>
                {song.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Genre Image */}
        <Form.Item label="Genre Image" name="file">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            accept="image/*"
            fileList={
              genreData.file
                ? [
                    {
                      uid: "-1",
                      name: genreData.file.name,
                      status: "done",
                      originFileObj: genreData.file,
                    },
                  ]
                : []
            }
            handicapped={loading}
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
