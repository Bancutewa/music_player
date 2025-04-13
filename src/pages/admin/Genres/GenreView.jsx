import React, { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetAllGenres, apiGetGenreById } from "../../../apis";
import { Select, Spin, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { admin_path } from "../../../utils/path";
import moment from "moment";

const { Title, Text } = Typography;

const GenreView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genreData, setGenreData] = useState({
    title: "",
    description: "",
    songs: [],
    coverImage: null,
    createdAt: "",
    updatedAt: "",
  });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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

  // Fetch genre data by ID
  const fetchGenre = async () => {
    try {
      setLoading(true);
      const response = await apiGetGenreById(id);
      console.log(response);

      if (response.success) {
        const genre = response.data;
        if (genre) {
          const genreInfo = {
            title: genre.title || "",
            description: genre.description || "",
            songs: genre.songs || [],
            coverImage: genre.coverImage || null,
            createdAt: genre.createdAt || "",
            updatedAt: genre.updatedAt || "",
          };
          console.log(genreInfo);
          setGenreData(genreInfo);
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

  // Handle genre selection
  const handleGenreSelect = (selectedId) => {
    if (selectedId && selectedId !== id) {
      navigate(`/genre-details/${selectedId}`);
    }
  };

  useEffect(() => {
    fetchGenres();
    if (id && id !== "1") {
      fetchGenre();
    } else {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng chọn một thể loại",
        text: "Hãy chọn một thể loại từ danh sách để xem.",
      });
      setGenreData({
        title: "",
        description: "",
        songs: [],
        coverImage: null,
        createdAt: "",
        updatedAt: "",
      });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <Select
        style={{ width: "100%", marginBottom: "24px" }}
        placeholder="Chọn thể loại để xem"
        onChange={handleGenreSelect}
        value={id && id !== "1" ? id : undefined}
        disabled={loading}
        loading={loading}
        className="mb-6"
      >
        {genres.map((genre) => (
          <Select.Option key={genre._id} value={genre._id}>
            {genre.title}
          </Select.Option>
        ))}
      </Select>

      {errorMessage && (
        <Text
          type="danger"
          className="block mb-4 text-red-500 text-center"
        >
          {errorMessage}
        </Text>
      )}

      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : id && id !== "1" && genreData.title ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white text-center py-4">
            <h1 className="text-2xl font-bold">Genre Details</h1>
          </div>

          {/* Genre Info Section */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cover Image */}
              {genreData.coverImage && (
                <div className="w-full md:w-1/3">
                  <img
                    src={genreData.coverImage}
                    alt={genreData.title}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Genre Details */}
              <div className="flex-1">
                <Title level={3} className="text-gray-800 mb-4">
                  {genreData.title}
                </Title>
                <Text className="text-gray-600 mb-4 block">
                  {genreData.description ||
                    "Không có mô tả cho thể loại này."}
                </Text>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Ngày tạo:</span>
                    <span>
                      {genreData.createdAt
                        ? moment(genreData.createdAt).format(
                            "DD/MM/YYYY HH:mm"
                          )
                        : "Không rõ"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      Cập nhật lần cuối:
                    </span>
                    <span>
                      {genreData.updatedAt
                        ? moment(genreData.updatedAt).format(
                            "DD/MM/YYYY HH:mm"
                          )
                        : "Không rõ"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Songs List */}
            <div className="mt-6">
              <Title level={4} className="text-gray-800 mb-3">
                Danh sách bài hát:
              </Title>
              {genreData.songs.length > 0 ? (
                <ul className="list-disc pl-5">
                  {genreData.songs.map((song) => (
                    <li key={song._id} className="text-gray-600 mb-2">
                      <Text>
                        {song.title} -{" "}
                        <span className="italic">
                          {song.artist?.title || "Không rõ nghệ sĩ"}
                        </span>
                      </Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text className="text-gray-600">
                  Không có bài hát nào trong thể loại này.
                </Text>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <Link
                to={`${admin_path.GENRES_EDIT?.replace(":id", id)}`}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Chỉnh sửa
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Text className="text-center text-gray-600">
          {loading
            ? "Đang tải chi tiết thể loại..."
            : "Vui lòng chọn một thể loại từ danh sách phía trên."}
        </Text>
      )}
    </div>
  );
};

export default memo(GenreView);
