import React, { memo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  Progress,
  Spin,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  apiGetSongById,
  apiUpdateSong,
  apiGetAllGenres,
  apiGetAllArtists,
  apiGetAllSongs,
} from "../../../apis";

const { Title } = Typography;
const { TextArea } = Input;

const SongEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Added for URL navigation
  const [form] = Form.useForm();
  const [songData, setSongData] = useState({
    title: "",
    song: null,
    cover: null,
    genre: [],
    artist: "",
    lyrics: "",
  });
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchSongs = async () => {
    try {
      const response = await apiGetAllSongs();
      if (response.success) {
        setSongs(response.data);
      } else {
        console.error(response.error);
        setSongs([]);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongs([]);
    }
  };

  const fetchSong = async (songId) => {
    try {
      const response = await apiGetSongById(songId);
      if (response.success) {
        const { title, genre, url, coverImage, artist, lyrics } =
          response.data;
        const initialData = {
          title,
          song: url
            ? [{ uid: "-1", name: "Current Song", url }]
            : null,
          cover: coverImage
            ? [{ uid: "-1", name: "Current Cover", url: coverImage }]
            : null,
          genre: genre.map((g) => g._id),
          artist: artist?._id || "",
          lyrics: lyrics || "",
        };
        setSongData(initialData);
        form.setFieldsValue(initialData);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await apiGetAllGenres();
      if (response?.success) setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await apiGetAllArtists();
      if (response?.success) setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
    fetchSong(id);
    fetchGenres();
    fetchArtists();
  }, [id]);

  // Handle song selection change
  const handleSongSelect = (selectedId) => {
    navigate(`/song-edit/${selectedId}`); // Fetch new song data
  };

  const handleFileChange =
    (name) =>
    ({ fileList }) => {
      setSongData({
        ...songData,
        [name]:
          fileList.length > 0 ? fileList[0].originFileObj : null,
      });
    };

  const handleSubmit = async () => {
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("artist", songData.artist);
    formData.append("lyrics", songData.lyrics);
    formData.append("genre", songData.genre.join(","));

    if (songData.song instanceof File) {
      formData.append("song", songData.song);
    } else if (
      Array.isArray(songData.song) &&
      songData.song[0]?.url
    ) {
      formData.append("song", songData.song[0].url);
    }

    if (songData.cover instanceof File) {
      formData.append("cover", songData.cover);
    } else if (
      Array.isArray(songData.cover) &&
      songData.cover[0]?.url
    ) {
      formData.append("cover", songData.cover[0].url);
    }

    try {
      const response = await apiUpdateSong(
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
        alert("Song updated successfully!");
      } else {
        alert("Failed to update song.");
      }
    } catch (error) {
      console.error("Error updating song:", error);
      alert("An error occurred while updating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px" }}>
      {/* Song Selection Dropdown */}
      <Select
        style={{ width: "100%", marginBottom: "24px" }}
        placeholder="Select song to edit"
        onChange={handleSongSelect}
        value={id}
        disabled={loading}
      >
        {songs.map((song) => (
          <Select.Option key={song._id} value={song._id}>
            {song.title}
          </Select.Option>
        ))}
      </Select>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "24px" }}
      >
        Edit Song
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
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter a title" },
          ]}
        >
          <Input placeholder="Enter song title" disabled={loading} />
        </Form.Item>

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

        <Form.Item label="Lyrics" name="lyrics">
          <TextArea
            rows={6}
            placeholder="Enter song lyrics"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item label="Song File" name="song">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange("song")}
            accept="audio/*"
            fileList={songData.song ? [songData.song] : []}
            disabled={loading}
          >
            <Button icon={<UploadOutlined />} disabled={loading}>
              Upload Song
            </Button>
          </Upload>
          {Array.isArray(songData.song) && songData.song[0]?.url && (
            <p style={{ color: "#999", marginTop: 8 }}>
              Current:{" "}
              <a
                href={songData.song[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {songData.song[0].url}
              </a>
            </p>
          )}
        </Form.Item>

        <Form.Item label="Cover Image" name="cover">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange("cover")}
            accept="image/*"
            fileList={songData.cover ? [songData.cover] : []}
            disabled={loading}
          >
            <Button icon={<UploadOutlined />} disabled={loading}>
              Upload Cover
            </Button>
          </Upload>
          {Array.isArray(songData.cover) &&
            songData.cover[0]?.url && (
              <p style={{ color: "#999", marginTop: 8 }}>
                Current:{" "}
                <a
                  href={songData.cover[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {songData.cover[0].url}
                </a>
              </p>
            )}
        </Form.Item>

        {loading && (
          <Form.Item label="Upload Progress">
            <Progress percent={uploadProgress} status="active" />
          </Form.Item>
        )}

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

export default memo(SongEdit);
