import React, { memo, useState, useEffect } from "react";
import { apiGetAllSongs } from "../../../apis/song";
import { apiGetAllGenres } from "../../../apis/genre";
import { Link } from "react-router-dom";
import { admin_path } from "../../../utils/path";
import {
  Card,
  Input,
  Layout,
  Menu,
  Row,
  Col,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useDebounce from "../../../hooks/useDebounce";

const { Sider, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const Songs = () => {
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchSongs = async (params = {}) => {
    try {
      if (debouncedSearch) {
        params.title = debouncedSearch;
      }

      const response = await apiGetAllSongs(params);
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

  const fetchGenres = async () => {
    try {
      const response = await apiGetAllGenres();
      if (response.success) {
        setGenres([{ _id: "all", name: "All" }, ...response.data]);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleGenreChange = async (id) => {
    console.log("Genre clicked:", id);
    try {
      if (id === "all") {
        await fetchSongs({});
      } else {
        const response = await apiGetAllSongs({ genre: id });
        if (response.success) setSongs(response.data);
        else console.log(response.error);
      }
    } catch (error) {
      console.error("Error fetching songs by genre:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [debouncedSearch]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Improved Sidebar */}
      <Sider
        width={240}
        style={{
          background: "#fff",
          boxShadow: "2px 0 8px 0 rgba(0,0,0,0.05)",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "16px" }}>
          <Title
            level={4}
            style={{
              margin: 0,
              padding: "8px 0",
              color: "#1890ff",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            Music Genres
          </Title>
          <Menu
            mode="vertical"
            style={{
              border: "none",
              marginTop: "8px",
            }}
            items={genres.map((genre) => ({
              key: genre._id,
              label: (
                <span
                  style={{
                    color: "#595959",
                    fontSize: "14px",
                    transition: "all 0.3s",
                  }}
                >
                  {genre.name}
                </span>
              ),
              onClick: () => handleGenreChange(genre._id),
            }))}
            selectable={false}
            theme="light"
          />
        </div>
      </Sider>

      {/* Main Content */}
      <Content style={{ padding: "24px" }}>
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Input
              placeholder="Search songs by title..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: 16, maxWidth: 400 }}
              size="large"
            />
          </Col>
          {songs.map((song) => (
            <Col xs={24} sm={12} md={8} lg={6} key={song._id}>
              <Link
                to={`${admin_path.SONGS_VIEW.replace(
                  ":id",
                  song._id
                )}`}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      alt={song.title}
                      src={
                        song.coverImage ||
                        "https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
                      }
                      style={{ height: 200, objectFit: "cover" }}
                    />
                  }
                >
                  <Meta
                    title={song.title}
                    description={
                      song.artist?.title || "Unknown Artist"
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default memo(Songs);
