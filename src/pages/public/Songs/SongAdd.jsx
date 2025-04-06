import React, { memo, useState, useEffect } from "react";
import {
  apiCreateSong,
  apiGetAllGenres,
  apiGetAllArtists,
} from "../../../apis";
import {
  Form,
  Input,
  Select,
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

const SongAdd = () => {
  const [form] = Form.useForm();
  const [songData, setSongData] = useState({
    title: "",
    song: null,
    cover: null,
    genre: [],
    artist: "",
    lyrics: "",
  });
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const response = await apiGetAllGenres();
      if (response?.success) setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Fetch artists
  const fetchArtists = async () => {
    try {
      const response = await apiGetAllArtists();
      if (response?.success) setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchArtists();
  }, []);

  // Handle file upload
  const handleFileChange =
    (name) =>
    ({ fileList }) => {
      setSongData({
        ...songData,
        [name]:
          fileList.length > 0 ? fileList[0].originFileObj : null,
      });
    };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("artist", songData.artist);
    formData.append("lyrics", songData.lyrics);
    formData.append("genre", songData.genre.join(","));
    if (songData.song) formData.append("song", songData.song);
    if (songData.cover) formData.append("cover", songData.cover);

    try {
      const response = await apiCreateSong(formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      if (response?.success) {
        message.success("Song created successfully!");
        setSongData({
          title: "",
          song: null,
          cover: null,
          genre: [],
          artist: "",
          lyrics: "",
        });
        form.resetFields();
        setUploadProgress(0);
      } else {
        message.error("Failed to create song.");
      }
    } catch (error) {
      console.error("Error creating song:", error);
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
        Add New Song
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={songData}
        onValuesChange={(changedValues) =>
          setSongData({ ...songData, ...changedValues })
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
          <Input placeholder="Enter song title" disabled={loading} />
        </Form.Item>

        {/* Artist */}
        <Form.Item
          label="Artist"
          name="artist"
          rules={[
            { required: true, message: "Please select an artist" },
          ]}
        >
          <Select placeholder="Select an artist" disabled={loading}>
            {artists.map((artist) => (
              <Select.Option key={artist._id} value={artist._id}>
                {artist.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Genres */}
        <Form.Item
          label="Genres"
          name="genre"
          rules={[
            {
              required: true,
              message: "Please select at least one genre",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select genres"
            disabled={loading}
            allowClear
          >
            {genres.map((g) => (
              <Select.Option key={g._id} value={g._id}>
                {g.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Lyrics */}
        <Form.Item label="Lyrics" name="lyrics">
          <TextArea
            rows={6}
            placeholder="Enter song lyrics"
            disabled={loading}
          />
        </Form.Item>

        {/* Song File */}
        <Form.Item
          label="Song File"
          name="song"
          rules={[
            { required: true, message: "Please upload a song file" },
          ]}
        >
          <Upload
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleFileChange("song")}
            accept="audio/*"
            fileList={songData.song ? [songData.song] : []}
            disabled={loading}
          >
            <Button icon={<UploadOutlined />} disabled={loading}>
              Upload Song
            </Button>
          </Upload>
        </Form.Item>

        {/* Cover Image */}
        <Form.Item label="Cover Image" name="cover">
          <Upload
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleFileChange("cover")}
            accept="image/*"
            fileList={songData.cover ? [songData.cover] : []}
            disabled={loading}
          >
            <Button icon={<UploadOutlined />} disabled={loading}>
              Upload Cover
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

export default memo(SongAdd);
