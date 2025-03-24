import React, { memo, useState } from "react";

const SongAdd = () => {
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    timeLength: "",
    image: null,
    mp3: null,
    brief: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSongData({ ...songData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Song Data:", songData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        ADD NEW Song
      </h2>
      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <div className="mb-4">
          <label className="block text-gray-700">TITLE</label>
          <input
            type="text"
            name="title"
            value={songData.title}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none py-2"
          />
        </div>

        {/* ARTIST */}
        <div className="mb-4">
          <label className="block text-gray-700">ARTIST</label>
          <input
            type="text"
            name="artist"
            value={songData.artist}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none py-2"
          />
        </div>

        {/* TIME LENGTH */}
        <div className="mb-4">
          <label className="block text-gray-700">TIME LENGTH</label>
          <input
            type="text"
            name="timeLength"
            value={songData.timeLength}
            onChange={handleChange}
            placeholder='eg: "04:20"'
            className="w-full border-b border-gray-400 focus:outline-none py-2"
          />
        </div>

        {/* SONG IMAGE */}
        <div className="mb-4">
          <label className="block text-gray-700">SONG IMAGE</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* SONG MP3 FILE */}
        <div className="mb-4">
          <label className="block text-gray-700">SONG MP3 FILE</label>
          <input
            type="file"
            name="mp3"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* BRIEF */}
        <div className="mb-6">
          <label className="block text-gray-700">BRIEF</label>
          <textarea
            name="brief"
            value={songData.brief}
            onChange={handleChange}
            placeholder='e.g. "Enter any size of text description here"'
            className="w-full border border-gray-300 rounded p-2"
            rows="3"
          ></textarea>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(SongAdd);
