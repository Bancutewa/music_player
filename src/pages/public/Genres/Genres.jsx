import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Sample genres data
const genresData = [
  {
    id: 1,
    name: "Rock",
    description:
      'Rock music is a broad genre of popular music that originated as "rock and roll" in the United States in the late 1940s and early 1950s.',
    albums: 12,
    songs: 148,
    artists: 8,
    color: "#58bec2",
    percentage: 28,
  },
  {
    id: 2,
    name: "Metal",
    description:
      "Heavy metal is a genre of rock music that developed in the late 1960s and early 1970s, largely in the United Kingdom and the United States.",
    albums: 8,
    songs: 96,
    artists: 5,
    color: "#c89385",
    percentage: 20,
  },
  {
    id: 3,
    name: "Pop",
    description:
      "Pop music is a genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.",
    albums: 10,
    songs: 120,
    artists: 7,
    color: "#ca9d5a",
    percentage: 25,
  },
  {
    id: 4,
    name: "Instrumental",
    description:
      "Instrumental music is music that is purely instrumental, with no vocals.",
    albums: 5,
    songs: 45,
    artists: 3,
    color: "#8da8ae",
    percentage: 12,
  },
  {
    id: 5,
    name: "Electronic",
    description:
      "Electronic music is music that employs electronic musical instruments, digital instruments, or circuitry-based music technology in its creation.",
    albums: 4,
    songs: 38,
    artists: 4,
    color: "#373f45",
    percentage: 10,
  },
  {
    id: 6,
    name: "Jazz",
    description:
      "Jazz is a music genre that originated in the African-American communities of New Orleans, United States, in the late 19th and early 20th centuries.",
    albums: 2,
    songs: 24,
    artists: 2,
    color: "#e2c89d",
    percentage: 5,
  },
];

const COLORS = [
  "#58bec2",
  "#c89385",
  "#ca9d5a",
  "#8da8ae",
  "#373f45",
  "#e2c89d",
];

const pieData = genresData.map((genre) => ({
  name: genre.name,
  value: genre.percentage,
}));

const Genres = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter genres based on search term
  const filteredGenres = genresData.filter(
    (genre) =>
      genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      genre.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-medium text-gray-800 mb-4">
        Genres
      </h1>

      {/* Search and Add Genre Section */}
      <div className="card mb-6">
        <div className="card-body bg-white p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
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
                  placeholder="Search by genre name or description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-[120px] self-end">
              <button className="w-full bg-cyan text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center justify-center">
                <span className="material-icons mr-1 text-sm">
                  add
                </span>
                <span>Add Genre</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Distribution Chart */}
      <div className="card mb-6">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-600">
            GENRE DISTRIBUTION
          </h2>
          <div className="flex">
            <button className="text-gray-400 mx-1">
              <span className="material-icons">expand_more</span>
            </button>
            <button className="text-gray-400 mx-1">
              <span className="material-icons">close</span>
            </button>
          </div>
        </div>
        <div className="card-body p-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend
                  align="center"
                  verticalAlign="bottom"
                  layout="horizontal"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Genres List */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-600">
            ALL GENRES ({filteredGenres.length})
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
        <div className="card-body p-0">
          <div className="divide-y divide-gray-100">
            {filteredGenres.map((genre) => (
              <div
                key={genre.id}
                className="flex flex-col sm:flex-row sm:items-center p-4 hover:bg-gray-50"
              >
                <div className="sm:w-1/4 mb-3 sm:mb-0">
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: genre.color }}
                    ></div>
                    <h3 className="font-medium">{genre.name}</h3>
                  </div>
                </div>
                <div className="sm:w-2/4 mb-3 sm:mb-0">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {genre.description}
                  </p>
                </div>
                <div className="sm:w-1/4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                  <div className="flex space-x-4 text-sm text-gray-500 mb-3 sm:mb-0">
                    <div className="flex items-center">
                      <span className="material-icons text-cyan text-sm mr-1">
                        album
                      </span>
                      <span>{genre.albums}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons text-cyan text-sm mr-1">
                        music_note
                      </span>
                      <span>{genre.songs}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons text-cyan text-sm mr-1">
                        person
                      </span>
                      <span>{genre.artists}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
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

export default Genres;
