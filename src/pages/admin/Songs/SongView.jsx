import React, {
  memo,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  apiGetAllSongs,
  apiGetSongById,
  apiDeleteSong,
} from "../../../apis";
import { Link, useParams, useNavigate } from "react-router-dom";
import { admin_path } from "../../../utils/path";
import { Select, Spin, Typography, Button } from "antd";
import Swal from "sweetalert2";
import moment from "moment";

const { Title, Text } = Typography;

const SongView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState({
    title: "",
    description: "",
    genre: [],
    artist: null,
    likes: [],
    url: "",
    coverImage: "",
    lyrics: "",
    createdAt: "",
    updatedAt: "",
  });
  const [songs, setSongs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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

  const fetchSong = async (songId) => {
    try {
      setLoading(true);
      const response = await apiGetSongById(songId);
      if (response.success && response.data) {
        const songData = {
          title: response.data.title || "",
          description: response.data.description || "",
          genre: response.data.genre || [],
          artist: response.data.artist || null,
          likes: response.data.likes || [],
          url: response.data.url || "",
          coverImage: response.data.coverImage || "",
          lyrics: response.data.lyrics || "",
          createdAt: response.data.createdAt || "",
          updatedAt: response.data.updatedAt || "",
        };
        setSong(songData);
        setErrorMessage(null);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      } else {
        setSong({});
        setErrorMessage(response.message || "Song not found.");
        Swal.fire(
          "Oops! Something went wrong",
          response.message || "Song not found.",
          "error"
        );
      }
    } catch (error) {
      setSong({});
      const errorMsg = error.message || "Error fetching song.";
      setErrorMessage(errorMsg);
      Swal.fire("Oops! Something went wrong", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiDeleteSong(id);
          if (response.success) {
            Swal.fire(
              "Deleted!",
              "The song has been deleted.",
              "success"
            );
            navigate("/songs"); // Redirect to song list or another page
          } else {
            Swal.fire(
              "Error!",
              response.message || "Failed to delete song.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            error.message || "Error deleting song.",
            "error"
          );
        }
      }
    });
  };

  const getShortLyrics = useCallback((lyric) => {
    if (!lyric || lyric.trim() === "") return "No lyrics available.";
    const lines = lyric.split("\n");
    if (lines.length > 5) {
      return lines.slice(0, 5).join("\n") + "...";
    }
    return lyric;
  }, []);

  const handleSongSelect = useCallback(
    (selectedId) => {
      if (selectedId && selectedId !== id) {
        if (isPlaying) {
          Swal.fire({
            title: "Audio is playing",
            text: "Do you want to change the song?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it",
            cancelButtonText: "No, keep playing",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/song-details/${selectedId}`);
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
              }
            }
          });
        } else {
          navigate(`/song-details/${selectedId}`);
        }
      }
    },
    [id, isPlaying, navigate]
  );

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  useEffect(() => {
    fetchSongs();
    if (id && id !== "1") {
      fetchSong(id);
    } else {
      setSong({
        title: "",
        description: "",
        genre: [],
        artist: null,
        likes: [],
        url: "",
        coverImage: "",
        lyrics: "",
        createdAt: "",
        updatedAt: "",
      });
      Swal.fire({
        icon: "warning",
        title: "Please select a song",
        text: "Choose a song from the list to view details.",
      });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <Select
        style={{ width: "100%", marginBottom: "24px" }}
        placeholder="Select song to view"
        onChange={handleSongSelect}
        value={id && id !== "1" ? id : undefined}
        disabled={loading}
        loading={loading}
        className="mb-6"
      >
        {songs.map((song) => (
          <Select.Option key={song._id} value={song._id}>
            {song.title}
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
      ) : id && id !== "1" && song.title ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white text-center py-4">
            <h1 className="text-2xl font-bold">Genre Details</h1>
          </div>

          {/* Song Info Section */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cover Image */}
              {song.coverImage ? (
                <div className="w-full md:w-1/3">
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>
              ) : (
                <Text className="text-gray-600">
                  No cover image available.
                </Text>
              )}

              {/* Song Details */}
              <div className="flex-1">
                <Title level={3} className="text-gray-800 mb-4">
                  {song.title}
                </Title>
                <Text className="text-gray-600 mb-4 block">
                  {song.description ||
                    "No description available for this song."}
                </Text>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Text strong>Genre:</Text>
                    <Text>
                      {song.genre?.map((el, index) => (
                        <span key={el._id}>
                          {el.title}
                          {index < song.genre.length - 1 ? ", " : ""}
                        </span>
                      )) || "Unknown"}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text strong>Artist:</Text>
                    <Text>{song.artist?.title || "Unknown"}</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text strong>Likes:</Text>
                    <Text>{song.likes?.length || 0}</Text>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Text strong>Created:</Text>
                    <Text>
                      {song.createdAt
                        ? moment(song.createdAt).format(
                            "DD/MM/YYYY HH:mm"
                          )
                        : "Unknown"}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text strong>Updated:</Text>
                    <Text>
                      {song.updatedAt
                        ? moment(song.updatedAt).format(
                            "DD/MM/YYYY HH:mm"
                          )
                        : "Unknown"}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Player */}
            <div className="mt-6">
              <Title level={4} className="text-gray-800 mb-3">
                Listen to the Song:
              </Title>
              {song.url ? (
                <audio
                  ref={audioRef}
                  controls
                  className="w-full shadow-md"
                  key={song._id}
                  onPlay={handlePlay}
                  onPause={handlePause}
                >
                  <source src={song.url} type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <Text className="text-gray-600">
                  No audio available for this song.
                </Text>
              )}
            </div>

            {/* Lyrics Section */}
            <div className="mt-6">
              <Title level={4} className="text-gray-800 mb-3">
                Lyrics:
              </Title>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {isExpanded
                  ? song.lyrics || "No lyrics available."
                  : getShortLyrics(song.lyrics)}
              </p>
              {song.lyrics && song.lyrics.split("\n").length > 5 && (
                <Button
                  type="link"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <Link
                to={`${admin_path.SONGS_EDIT.replace(":id", id)}`}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Edit
              </Link>
              <Button
                danger
                onClick={handleDelete}
                className="px-6 py-2"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Text className="text-center text-gray-600">
          {loading
            ? "Loading song details..."
            : "Please select a song from the dropdown above."}
        </Text>
      )}
    </div>
  );
};

export default memo(SongView);
