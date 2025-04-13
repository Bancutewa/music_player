import React, { memo, useEffect, useState, useRef } from "react";
import { apiGetAllSongs, apiGetSongById } from "../../../apis";
import { Link, useParams, useNavigate } from "react-router-dom";
import { admin_path } from "../../../utils/path";
import { Select, message } from "antd";

const SongView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState({});
  const [songs, setSongs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const fetchSongs = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchSong = async (songId) => {
    setLoading(true);
    try {
      const response = await apiGetSongById(songId);
      if (response.success) {
        setSong(response.data);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      } else {
        console.error(response.error);
        setSong({});
      }
    } catch (error) {
      console.error("Error fetching song:", error);
      setSong({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
    if (id) {
      fetchSong(id);
    } else {
      setSong({});
    }
  }, [id]);

  const getShortLyrics = (lyric) => {
    const lines = lyric.split("\n");
    if (lines.length > 5) {
      return lines.slice(0, 5).join("\n") + "...";
    }
    return lyric;
  };

  const handleSongSelect = (selectedId) => {
    if (selectedId && selectedId !== id) {
      if (isPlaying) {
        const confirmChange = window.confirm(
          "Audio is currently playing. Do you want to change the song?"
        );
        if (confirmChange) {
          navigate(`/song/${selectedId}`);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
          }
        }
      } else {
        navigate(`/song/${selectedId}`);
      }
    }
  };

  // Handle audio play event
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Handle audio pause event
  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <Select
        style={{ width: "100%", marginBottom: "24px" }}
        placeholder="Select song to view"
        onChange={handleSongSelect}
        value={id || undefined}
        disabled={loading}
        loading={loading}
      >
        {songs.map((song) => (
          <Select.Option key={song._id} value={song._id}>
            {song.title}
          </Select.Option>
        ))}
      </Select>

      {id && song.title ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white text-center py-4">
            <h1 className="text-2xl font-bold">Song Details</h1>
          </div>

          {/* Song Info Section */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cover Image */}
              <div className="w-full md:w-1/3">
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Song Details */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {song.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {song.description ||
                    "No description available for this song."}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Genre:</span>
                    <span>
                      {song.genre?.map(
                        (el, index) =>
                          `${el.title}${
                            index === song.genre.length - 1
                              ? ""
                              : ", "
                          }`
                      ) || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Likes:</span>
                    <span>{song.likes?.length || 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <span className="font-medium">Artist:</span>
                  <span>{song.artist?.title || "Unknown"}</span>
                </div>
              </div>
            </div>

            {/* Audio Player */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Listen to the Song:
              </h3>
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
            </div>

            {/* Lyrics Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Lyrics:
              </h3>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-teal-600 hover:text-teal-800 font-medium cursor-pointer"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {isExpanded
                  ? song.lyrics || "Lyrics will be here soon..."
                  : getShortLyrics(
                      song.lyrics || "Lyrics will be here soon..."
                    )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <Link
                to={`${admin_path.SONGS_EDIT.replace(
                  ":id",
                  song._id
                )}`}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          {loading
            ? "Loading song details..."
            : "Please select a song from the dropdown above."}
        </div>
      )}
    </div>
  );
};

export default memo(SongView);
