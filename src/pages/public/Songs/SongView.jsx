import React, { memo, useEffect, useState } from "react";
import { apiGetSongById } from "../../../apis";
import { useParams } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-100 p-6">
      {song.title ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            SONG DETAIL
          </h1>

          {/* Song Info Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Cover Image */}
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={song.coverImage}
                alt={song.title}
                className="w-full h-full object-cover rounded-lg shadow-sm"
              />
            </div>

            {/* Song Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {song.title}
              </h2>
              <p className="text-gray-600 mb-3">
                {song.description ||
                  ` Humans can evaluate these visual elements in several
                situations to find a sense of balance.`}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>340 Contacts</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7h.01M7 3h5a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                  <span>Tech Lead, YIAM</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
                Share
              </button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
                Add As Favorite
              </button>
            </div>
          </div>
          {/* Audio Player */}
          <div className="border-t pt-6">
            <audio controls className="w-full">
              <source src={song.url} type="audio/mp4" />
              Your browser does not support the audio element.
            </audio>
          </div>
          {/* About Section */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Lyrics:
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {isExpanded
                ? song.lyrics || "Lyrics will be here soon..."
                : getShortLyrics(
                    song.lyrics || "Lyrics will be here soon..."
                  )}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-teal-600 hover:text-teal-800 font-medium"
            >
              {isExpanded ? "Rút gọn" : "Xem thêm"}
            </button>
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
