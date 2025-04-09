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
import { apiGetAllGenres } from "../../../apis/genre";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { COLORS } from "../../../utils/constants";
import useDebounce from "../../../hooks/useDebounce";
const { Title } = Typography;

const Genres = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genresData, setGenresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(searchTerm, 500);
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
      }
    } catch (error) {
      console.error("Failed to fetch genres:", error);
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

  if (loading) {
    return <div>Loading genres...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Genres</Title>
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
          <Button type="primary" icon={<PlusOutlined />}>
            Add Genre
          </Button>
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
            pageSize: 2,
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
                <Button
                  type="link"
                  icon={<i className="anticon anticon-edit" />}
                >
                  Edit
                </Button>
                <Button
                  type="link"
                  danger
                  icon={<i className="anticon anticon-delete" />}
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
