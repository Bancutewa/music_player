import React, { memo, useEffect, useState } from "react";
import { apiGetSongById } from "../../../apis";
import { Link, useParams } from "react-router-dom";
import path from "../../../utils/path";

const SongView = () => {
  const { id } = useParams();
  const [song, setSong] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchSong = async () => {
    try {
      const response = await apiGetSongById(id);
      if (response.success) {
        setSong(response.data);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  useEffect(() => {
    fetchSong();
  }, [id]);

  const getShortLyrics = (lyric) => {
    const lines = lyric.split("\n");
    if (lines.length > 5) {
      return lines.slice(0, 5).join("\n") + "...";
    }
    return lyric;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      {song.title ? (
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
                          `${el.name}${
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
              <audio controls className="w-full  shadow-md">
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
                className="mt-3 text-teal-600 hover:text-teal-800 font-medium"
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
                to={`/${path.SONGS_EDIT.replace(":id", song._id)}`}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          Loading song details...
        </div>
      )}
    </div>
  );
};

export default memo(SongView);
