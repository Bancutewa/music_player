import React, { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  apiGetAllGenres,
  apiGetAllSongs,
  apiGetGenreById,
  apiUpdateGenre,
} from "../../../apis";
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
import Swal from "sweetalert2";
import path from "../../../utils/path";

const { Title } = Typography;
const { TextArea } = Input;

const GenreEdit = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [genreData, setGenreData] = useState({
    title: "",
    description: "",
    songs: [],
    file: null,
  });
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch all songs for the select dropdown
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

  // Fetch genre data by ID
  const fetchGenre = async () => {
    try {
      setLoading(true);
      const response = await apiGetGenreById(id);
      console.log(response);

      if (response.success) {
        const genre = response.data;
        console.log("genre", genre);

        if (genre) {
          const genreInfo = {
            title: genre.title,
            description: genre.description || "",
            songs: genre.songs,
            file: genre.image
              ? {
                  name: "current-image",
                  uid: "-1",
                  status: "done",
                  url: genre.image,
                }
              : null,
          };
          console.log(genreInfo);

          setGenreData(genreInfo);
          form.setFieldsValue(genreInfo);
          setErrorMessage(null);
        } else {
          setErrorMessage("Genre not found.");
          Swal.fire(
            "Oops! Something went wrong",
            "Genre not found.",
            "error"
          );
        }
      } else {
        setErrorMessage(response.message || "Failed to fetch genre.");
        Swal.fire(
          "Oops! Something went wrong",
          response.message || "Failed to fetch genre.",
          "error"
        );
      }
    } catch (error) {
      const errorMsg = error.message || "Error fetching genre.";
      setErrorMessage(errorMsg);
      Swal.fire("Oops! Something went wrong", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all genres for the select dropdown
  const fetchGenres = async () => {
    try {
      setLoading(true);
      const response = await apiGetAllGenres();
      if (response.success) {
        setGenres(response.data);
        setErrorMessage(null);
      } else {
        setGenres([]);
        setErrorMessage(
          response.message || "Failed to fetch genres."
        );
        Swal.fire(
          "Oops! Something went wrong",
          response.message || "Failed to fetch genres.",
          "error"
        );
      }
    } catch (error) {
      setGenres([]);
      const errorMsg = error.message || "Error fetching genres.";
      setErrorMessage(errorMsg);
      Swal.fire("Oops! Something went wrong", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
    fetchGenres();
    if (id && id !== "1") {
      fetchGenre();
    } else if (id === "1") {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng chọn một thể loại",
        text: "Hãy chọn một thể loại từ danh sách để chỉnh sửa.",
      });
      setGenreData({
        title: "",
        description: "",
        songs: [],
        file: null,
      });
      form.resetFields();
    } else {
      setGenreData({
        title: "",
        description: "",
        songs: [],
        file: null,
      });
      form.resetFields();
    }
  }, [id, form]);

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

  // Handle genre selection for editing
  const handleGenreSelect = (selectedId) => {
    if (selectedId && selectedId !== id) {
      navigate(`/genre-edit/${selectedId}`);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setUploadProgress(0);
    setErrorMessage(null);
    try {
      await form.validateFields();
      const formData = new FormData();
      formData.append("title", genreData.title);
      formData.append("description", genreData.description);
      formData.append("songs", genreData.songs.join(","));
      if (genreData.file && genreData.file instanceof File) {
        formData.append("genre", genreData.file);
      }

      const response = await apiUpdateGenre(
        { id, data: formData },
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response?.success) {
        Swal.fire(
          "Success!",
          "Genre updated successfully",
          "success"
        );
        fetchGenre();
      } else {
        setErrorMessage(
          response?.message || "Failed to update genre."
        );
        Swal.fire(
          "Oops! Something went wrong",
          response?.message || "Failed to update genre.",
          "error"
        );
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while updating. Please try again.";
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
        Edit Genre
      </Title>

      {/* Genre Selection Dropdown */}
      <Select
        style={{ width: "100%", marginBottom: "24px" }}
        placeholder="Select genre to edit"
        onChange={handleGenreSelect}
        value={id && id !== "1" ? id : undefined}
        disabled={loading}
        loading={loading}
        allowClear
      >
        {genres.map((genre) => (
          <Select.Option key={genre._id} value={genre._id}>
            {genre.title}
          </Select.Option>
        ))}
      </Select>

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
          label="Songs"
          name="songs"
          rules={[
            {
              required: true,
              message: "Please select at least one song",
            },
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
                      name: genreData.file.name || "current-image",
                      status: "done",
                      url: genreData.file.url || undefined,
                      originFileObj:
                        genreData.file instanceof File
                          ? genreData.file
                          : undefined,
                    },
                  ]
                : []
            }
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
            {loading ? <Spin /> : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(GenreEdit);
