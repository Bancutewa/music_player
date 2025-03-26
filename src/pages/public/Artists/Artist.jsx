import { useState } from "react";
import { Link } from "react-router-dom";

// Sample artists data
const artistsData = [
  {
    id: 1,
    name: "Mellisa",
    genre: "Rock",
    albums: 3,
    songs: 24,
    followers: 25600,
    image: "https://ext.same-assets.com/3971512208/3598287726.png",
  },
  {
    id: 2,
    name: "Jude",
    genre: "Metal",
    albums: 2,
    songs: 18,
    followers: 19800,
    image: "https://ext.same-assets.com/3971512208/3598900489.png",
  },
  {
    id: 3,
    name: "Jack",
    genre: "Pop",
    albums: 4,
    songs: 32,
    followers: 43200,
    image: "https://ext.same-assets.com/3971512208/3098630037.png",
  },
  {
    id: 4,
    name: "Jackson",
    genre: "Instrumental",
    albums: 3,
    songs: 27,
    followers: 31500,
    image: "https://ext.same-assets.com/3971512208/3453355444.png",
  },
  {
    id: 5,
    name: "Law Tiger",
    genre: "Electronic",
    albums: 1,
    songs: 12,
    followers: 15200,
    image: "https://ext.same-assets.com/3971512208/792883086.jpeg",
  },
  {
    id: 6,
    name: "Misterious",
    genre: "Rock",
    albums: 2,
    songs: 19,
    followers: 21800,
    image: "https://ext.same-assets.com/3971512208/2931346886.png",
  },
  {
    id: 7,
    name: "Blank",
    genre: "Metal",
    albums: 2,
    songs: 22,
    followers: 18900,
    image: "https://ext.same-assets.com/3971512208/792883086.jpeg",
  },
  {
    id: 8,
    name: "Martini",
    genre: "Electronic",
    albums: 1,
    songs: 8,
    followers: 9700,
    image: "https://ext.same-assets.com/3971512208/3453355444.png",
  },
  {
    id: 9,
    name: "Jingle",
    genre: "Jazz",
    albums: 2,
    songs: 15,
    followers: 12400,
    image: "https://ext.same-assets.com/3971512208/3598287726.png",
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

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Filter artists based on search term and genre
  const filteredArtists = artistsData
    .filter((artist) => {
      const matchesSearch = artist.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGenre =
        selectedGenre === "All" || artist.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "followers") {
        return b.followers - a.followers;
      } else if (sortBy === "albums") {
        return b.albums - a.albums;
      }
      return 0;
    });

  return (
    <div>
      <h1 className="text-3xl font-medium text-gray-800 mb-4">
        Artists
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
                  placeholder="Search by artist name"
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
                htmlFor="sortBy"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Sort By
              </label>
              <select
                id="sortBy"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="followers">Followers</option>
                <option value="albums">Albums</option>
              </select>
            </div>

            <div className="w-[120px] self-end">
              <button className="w-full bg-cyan text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center justify-center">
                <span className="material-icons mr-1 text-sm">
                  person_add
                </span>
                <span>Add Artist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-600">
            ALL ARTISTS ({filteredArtists.length})
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex flex-col bg-white rounded-md shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="flex p-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-medium text-base mb-1">
                      <Link
                        to={`/artist-profile/${artist.id}`}
                        className="hover:text-cyan"
                      >
                        {artist.name}
                      </Link>
                    </h4>
                    <p className="text-gray-500 text-xs mb-2">
                      {artist.genre}
                    </p>
                    <div className="flex text-xs text-gray-500 space-x-3">
                      <span>{artist.albums} Albums</span>
                      <span>{artist.songs} Songs</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="material-icons text-cyan text-sm mr-1">
                        people
                      </span>
                      <span className="text-xs text-gray-600">
                        {(artist.followers / 1000).toFixed(1)}k
                        followers
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-gray-100 bg-gray-50">
                  <Link
                    to={`/artist-profile/${artist.id}`}
                    className="flex-1 py-2 text-center text-xs text-gray-600 hover:bg-gray-100"
                  >
                    View Profile
                  </Link>
                  <div className="w-px bg-gray-200"></div>
                  <button className="flex-1 py-2 text-center text-xs text-gray-600 hover:bg-gray-100">
                    Edit
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

export default Artists;
