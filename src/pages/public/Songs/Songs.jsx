import React, { memo, useState, useEffect } from "react";
import { apiGetAllSongs } from "../../../apis/song";
import { apiGetAllGenres } from "../../../apis/genre";

const Songs = () => {
  const [genres, setGenres] = useState([]); // Fixed variable name from getGenres to setGenres
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    const response = await apiGetAllSongs();
    if (response.success) setSongs(response.data);
    else console.log(response.error);
  };

  const fetchGenres = async () => {
    const response = await apiGetAllGenres();
    if (response.success) setGenres(response.data);
    else console.log(response.error);
  };

  useEffect(() => {
    fetchSongs();
    fetchGenres();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">All Genres</h2>
        <ul>
          {genres.map((genre, index) => (
            <li
              key={index}
              className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Gallery */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-4 gap-6">
          {songs.map((song, index) => (
            <div key={song._id || index} className="group">
              {" "}
              {/* Using _id as key */}
              <img
                src={
                  song.coverImage // Using coverImage from your data
                    ? song.coverImage
                    : "https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
                }
                alt={song.title}
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
              <p className="mt-2 text-sm font-semibold">
                {song.title}
              </p>
              {/* Since your sample data doesn't include author, adding a fallback */}
              <p className="text-xs text-gray-500">
                {song.author || "Unknown Artist"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default memo(Songs);
