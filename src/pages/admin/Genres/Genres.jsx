import { useEffect, useState } from "react";
import { Button, Card, Input, Space, Table, Typography } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { admin_path } from "../../../utils/path";
import { apiDeleteGenre, apiGetAllGenres } from "../../../apis/genre";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { COLORS } from "../../../utils/constants";
const { Title } = Typography;

const Genres = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genresData, setGenresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchGenresData = async () => {
    try {
      setLoading(true);
      const response = await apiGetAllGenres();
      if (response.success) {
        const totalSongs = response.data.reduce(
          (sum, genre) => sum + genre.songs.length,
          0
        );

        const formattedData = response.data.map((genre, index) => ({
          _id: genre._id,
          id: index + 1,
          title: genre.title,
          description:
            genre?.description ||
            `A genre featuring ${genre.title} music`,
          songs: genre.songs.length,
          artists: genre.songs.map((song) => song.artist.title),
          color: COLORS[index % COLORS.length],
          percentage:
            totalSongs > 0
              ? Math.round((genre.songs.length / totalSongs) * 100)
              : 0,
        }));
        setGenresData(formattedData);
        setErrorMessage(null);
      } else {
        setErrorMessage(response.message);
        Swal.fire(
          "Oops! Something went wrong",
          response.message,
          "error"
        );
      }
    } catch (error) {
      const errorMsg = error.message || "Failed to fetch genres.";
      setErrorMessage(errorMsg);
      Swal.fire("Oops! Something went wrong", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenresData();
  }, []);

  const pieData = genresData.map((genre) => ({
    title: genre.title,
    value: genre.percentage,
  }));

  const filteredGenres = genresData.filter(
    (genre) =>
      genre.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      genre.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const response = await apiDeleteGenre(id);
      if (response.success) {
        Swal.fire(
          "Success!",
          "Genre deleted successfully",
          "success"
        );
        fetchGenresData();
      } else {
        setErrorMessage(response.message);
        Swal.fire(
          "Oops! Something went wrong",
          response.message,
          "error"
        );
      }
    } catch (error) {
      const errorMsg = error.message || "Failed to delete genre.";
      setErrorMessage(errorMsg);
      Swal.fire("Oops! Something went wrong", errorMsg, "error");
    }
  };

  if (loading) {
    return <div>Loading genres...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Genres</Title>
      {errorMessage && (
        <div style={{ color: "red", marginBottom: 16 }}>
          {errorMessage}
        </div>
      )}
      <Card style={{ marginBottom: 24 }}>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by genre title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
          <Link to={`${admin_path.GENRES_ADD}`}>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Genre
            </Button>
          </Link>
        </Space>
      </Card>

      {/* Genre Distribution Chart */}
      <Card title="Genre Distribution" style={{ marginBottom: 24 }}>
        <div style={{ height: 450 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ title, percent }) =>
                  `${title} (${(percent * 100).toFixed(0)}%)`
                }
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend
                align="center"
                verticalAlign="bottom"
                layout="horizontal"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title={`All Genres (${filteredGenres.length})`}>
        <Table
          dataSource={filteredGenres}
          rowKey="id"
          pagination={{
            position: ["bottomCenter"],
            pageSize: 10,
          }}
        >
          <Table.Column
            title="Title"
            dataIndex="title"
            key="title"
            render={(text, record) => (
              <Space>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: record.color,
                  }}
                />
                <span>{text}</span>
              </Space>
            )}
          />
          <Table.Column
            title="Description"
            dataIndex="description"
            key="description"
            ellipsis={true}
          />
          <Table.Column title="Songs" dataIndex="songs" key="songs" />
          <Table.Column
            title="Artists"
            dataIndex="artists"
            key="artists"
            render={(artists) => artists.length}
          />
          <Table.Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Link
                  to={`${admin_path.GENRES_EDIT.replace(
                    ":id",
                    record._id
                  )}`}
                >
                  <Button
                    type="link"
                    icon={<i className="anticon anticon-edit" />}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  type="link"
                  danger
                  icon={<i className="anticon anticon-delete" />}
                  onClick={() => {
                    handleDelete(record._id);
                  }}
                >
                  Delete
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default Genres;
