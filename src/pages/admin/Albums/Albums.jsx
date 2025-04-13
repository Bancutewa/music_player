import { useState } from "react";
import { Link } from "react-router-dom";

// Sample album data
const albumsData = [
  {
    id: 1,
    title: "Modern Rock Music",
    artist: "Mellisa",
    genre: "Rock",
    year: 2023,
    image: "https://ext.same-assets.com/3971512208/2057226580.jpeg",
  },
  {
    id: 2,
    title: "Hard Metal Album",
    artist: "Jude",
    genre: "Metal",
    year: 2022,
    image: "https://ext.same-assets.com/3971512208/1590921150.jpeg",
  },
  {
    id: 3,
    title: "Love Songs Album",
    artist: "Jack",
    genre: "Pop",
    year: 2023,
    image: "https://ext.same-assets.com/3971512208/4242072625.jpeg",
  },
  {
    id: 4,
    title: "Instrumental Album",
    artist: "Jackson",
    genre: "Instrumental",
    year: 2021,
    image: "https://ext.same-assets.com/3971512208/3105436121.jpeg",
  },
  {
    id: 5,
    title: "Made for you",
    artist: "Law Tiger",
    genre: "Electronic",
    year: 2022,
    image: "https://ext.same-assets.com/3971512208/4007254988.jpeg",
  },
  {
    id: 6,
    title: "Kiss the sky",
    artist: "Misterious",
    genre: "Rock",
    year: 2021,
    image: "https://ext.same-assets.com/3971512208/1699512134.jpeg",
  },
  {
    id: 7,
    title: "In the Depths",
    artist: "Blank",
    genre: "Metal",
    year: 2023,
    image: "https://ext.same-assets.com/3971512208/1519028410.jpeg",
  },
  {
    id: 8,
    title: "Volcano",
    artist: "Martini",
    genre: "Electronic",
    year: 2022,
    image: "https://ext.same-assets.com/3971512208/2061402833.jpeg",
  },
  {
    id: 9,
    title: "Juicy touch",
    artist: "Jingle",
    genre: "Jazz",
    year: 2021,
    image: "https://ext.same-assets.com/3971512208/2057226580.jpeg",
  },
];

// Available filter options
const genres = [
  "All",
  "Rock",
  "Metal",
  "Pop",
  "Instrumental",
  "Electronic",
  "Jazz",
];
const years = ["All", "2023", "2022", "2021"];

const Albums = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Filter albums based on search term, genre, and year
  const filteredAlbums = albumsData.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || album.genre === selectedGenre;
    const matchesYear =
      selectedYear === "All" ||
      album.year.toString() === selectedYear;

    return matchesSearch && matchesGenre && matchesYear;
  });

  return (
    <div>
      <h1 className="text-3xl font-medium text-gray-800 mb-4">
        Albums
      </h1>

      {/* Search and Filter Section */}
      <div className="card mb-6">
        <div className="card-body bg-white p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Search
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-icons text-gray-400 text-sm">
                    search
                  </span>
                </span>
                <input
                  id="search"
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent"
                  placeholder="Search by title or artist"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-[180px]">
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Genre
              </label>
              <select
                id="genre"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[180px]">
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Year
              </label>
              <select
                id="year"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[120px] self-end">
              <button className="w-full bg-cyan text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center justify-center">
                <span className="material-icons mr-1 text-sm">
                  add
                </span>
                <span>Add Album</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-600">
            ALL ALBUMS ({filteredAlbums.length})
          </h2>
          <div className="flex">
            <button className="text-gray-400 mx-1">
              <span className="material-icons">expand_more</span>
            </button>
            <button className="text-gray-400 mx-1">
              <span className="material-icons">mode_edit</span>
            </button>
            <button className="text-gray-400 mx-1">
              <span className="material-icons">close</span>
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAlbums.map((album) => (
              <div key={album.id} className="flex flex-col">
                <div className="album-cover mb-3 aspect-square">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="play-overlay">
                    <Link
                      to={`album-view/${album.id}`}
                      className="text-white"
                    >
                      <span className="material-icons text-5xl">
                        play_circle_filled
                      </span>
                    </Link>
                  </div>
                </div>
                <h4 className="font-medium text-sm mb-1 line-clamp-1">
                  <Link
                    to={`album-view/${album.id}`}
                    className="hover:text-cyan"
                  >
                    {album.title}
                  </Link>
                </h4>
                <p className="text-gray-500 text-xs">
                  <Link
                    to={`artist-profile/${album.id}`}
                    className="hover:text-cyan"
                  >
                    {album.artist}
                  </Link>
                </p>
                <div className="flex justify-between mt-3">
                  <span className="text-xs text-gray-500">
                    {album.genre}
                  </span>
                  <span className="text-xs text-gray-500">
                    {album.year}
                  </span>
                </div>
                <div className="flex mt-2 space-x-2">
                  <button className="text-gray-400 hover:text-cyan">
                    <span className="material-icons text-sm">
                      edit
                    </span>
                  </button>
                  <button className="text-gray-400 hover:text-coral">
                    <span className="material-icons text-sm">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100">
            <span className="material-icons text-gray-500">
              chevron_left
            </span>
          </button>
          <button className="px-3 py-1 bg-cyan text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 hover:bg-gray-100">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100">
            <span className="material-icons text-gray-500">
              chevron_right
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Albums;
