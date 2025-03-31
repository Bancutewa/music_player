import React, { memo, useState, useEffect } from "react";
import { apiCreateSong, apiGetAllGenres } from "../../../apis";

const SongAdd = () => {
  const [songData, setSongData] = useState({
    title: "",
    song: null,
    cover: null,
    genre: "",
  });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fetchGenres = async () => {
    try {
      const response = await apiGetAllGenres();
      if (response?.success) {
        setGenres(response.data);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSongData({ ...songData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("song", songData.song);
    if (songData.cover) formData.append("cover", songData.cover);
    formData.append("genre", songData.genre);

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
        alert("Song created successfully!");
        setSongData({
          title: "",
          song: null,
          cover: null,
          genre: "",
        });
        setUploadProgress(0);
      } else {
        alert("Failed to create song.");
      }
    } catch (error) {
      console.error("Error creating song:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Add New Song
      </h2>
      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={songData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            disabled={loading}
          />
        </div>

        {/* GENRE */}
        <div className="mb-4">
          <label className="block text-gray-700">Genre</label>
          <select
            name="genre"
            value={songData.genre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            disabled={loading}
          >
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* SONG FILE */}
        <div className="mb-4">
          <label className="block text-gray-700">Song File</label>
          <input
            type="file"
            name="song"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2"
            accept="audio/*" // Chỉ chấp nhận file âm thanh
            disabled={loading}
          />
          {songData.song && (
            <p className="text-sm text-gray-500 mt-1">
              {songData.song.name}
            </p>
          )}
        </div>

        {/* COVER FILE */}
        <div className="mb-4">
          <label className="block text-gray-700">Cover Image</label>
          <input
            type="file"
            name="cover"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2"
            accept="image/*" // Chỉ chấp nhận file hình ảnh
            disabled={loading}
          />
          {songData.cover && (
            <p className="text-sm text-gray-500 mt-1">
              {songData.cover.name}
            </p>
          )}
        </div>

        {/* UPLOAD PROGRESS */}
        {loading && (
          <div className="mb-4">
            <label className="block text-gray-700">
              Upload Progress
            </label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-teal-500 h-4 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {uploadProgress}%
            </p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            ) : (
              "Save"
            )}
            {loading && "Uploading..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(SongAdd);
