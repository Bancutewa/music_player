import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Link } from "react-router-dom";

// Dummy data for charts and sections
const pageViewsData = [
  { name: "Week 1", views: 20, visitors: 10 },
  { name: "Week 2", views: 15, visitors: 12 },
  { name: "Week 3", views: 25, visitors: 10 },
  { name: "Week 4", views: 10, visitors: 15 },
  { name: "Week 5", views: 20, visitors: 8 },
  { name: "Week 6", views: 15, visitors: 12 },
  { name: "Week 7", views: 18, visitors: 14 },
  { name: "Week 8", views: 20, visitors: 16 },
  { name: "Week 9", views: 12, visitors: 10 },
  { name: "Week 10", views: 23, visitors: 14 },
  { name: "Week 11", views: 18, visitors: 8 },
  { name: "Week 12", views: 22, visitors: 10 },
  { name: "Week 13", views: 12, visitors: 16 },
  { name: "Week 14", views: 25, visitors: 8 },
  { name: "Week 15", views: 18, visitors: 12 },
  { name: "Week 16", views: 23, visitors: 10 },
  { name: "Week 17", views: 16, visitors: 14 },
  { name: "Week 18", views: 22, visitors: 8 },
  { name: "Week 19", views: 12, visitors: 15 },
  { name: "Week 20", views: 18, visitors: 10 },
  { name: "Week 21", views: 24, visitors: 12 },
  { name: "Week 22", views: 22, visitors: 16 },
];

const trendingAlbums = [
  {
    id: 1,
    title: "Modern Rock Music",
    artist: "Mellisa",
    image: "https://ext.same-assets.com/3971512208/2057226580.jpeg",
    link: "/album-view",
  },
  {
    id: 2,
    title: "Hard Metal Album",
    artist: "Jude",
    image: "https://ext.same-assets.com/3971512208/1590921150.jpeg",
    link: "/album-view",
  },
  {
    id: 3,
    title: "Love Songs Album",
    artist: "Jack",
    image: "https://ext.same-assets.com/3971512208/4242072625.jpeg",
    link: "/album-view",
  },
  {
    id: 4,
    title: "Instrumental Album",
    artist: "Jackson",
    image: "https://ext.same-assets.com/3971512208/3105436121.jpeg",
    link: "/album-view",
  },
  {
    id: 5,
    title: "Made for you",
    artist: "Law Tiger",
    image: "https://ext.same-assets.com/3971512208/4007254988.jpeg",
    link: "/album-view",
  },
  {
    id: 6,
    title: "Kiss the sky",
    artist: "Misterious",
    image: "https://ext.same-assets.com/3971512208/1699512134.jpeg",
    link: "/album-view",
  },
];

const trendingSongs = [
  {
    id: 1,
    title: "ligula pellent...",
    artist: "ahayes0",
    image: "https://ext.same-assets.com/3971512208/2469995542.jpeg",
    link: "/song-view",
  },
  {
    id: 2,
    title: "at ipsum a...",
    artist: "dross1",
    image: "https://ext.same-assets.com/3971512208/3022458997.jpeg",
    link: "/song-view",
  },
  {
    id: 3,
    title: "amet eleif...",
    artist: "bphillips2",
    image: "https://ext.same-assets.com/3971512208/1537016238.jpeg",
    link: "/song-view",
  },
  {
    id: 4,
    title: "nulla moll...",
    artist: "sramos3",
    image: "https://ext.same-assets.com/3971512208/68765198.jpeg",
    link: "/song-view",
  },
  {
    id: 5,
    title: "nulla temp...",
    artist: "sdean4",
    image: "https://ext.same-assets.com/3971512208/4267235822.jpeg",
    link: "/song-view",
  },
  {
    id: 6,
    title: "felis ut a...",
    artist: "amyers5",
    image: "https://ext.same-assets.com/3971512208/2061402833.jpeg",
    link: "/song-view",
  },
];

const newUsers = [
  { id: 1, firstName: "Mark", lastName: "Otto", progress: 50 },
  { id: 2, firstName: "Jacob", lastName: "Thornton", progress: 50 },
  { id: 3, firstName: "Larry", lastName: "the Bird", progress: 25 },
  { id: 3, firstName: "Larry", lastName: "the Bird", progress: 65 },
  { id: 3, firstName: "Larry", lastName: "the Bird", progress: 25 },
];

const trendingPlaylists = [
  { id: 1, title: "Metal Songs", by: "Otto", chart: "green" },
  { id: 2, title: "Love Songs", by: "Thornton", chart: "red" },
  { id: 3, title: "Instrumental", by: "the Bird", chart: "green" },
  { id: 3, title: "Rock Music", by: "the Bird", chart: "amber" },
  { id: 3, title: "Classics", by: "the Bird", chart: "red" },
];

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-medium text-gray-800 mb-6">
        Music
      </h1>

      {/* Page Views / Unique Visitors Chart */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-600">
            PAGE VIEWS / UNIQUE VISITORS
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
        <div className="card-body h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={pageViewsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="colorViews"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#58bec2"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#58bec2"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="colorVisitors"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#c89385"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#c89385"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="views"
                name="Page Views"
                stroke="#58bec2"
                fillOpacity={1}
                fill="url(#colorViews)"
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                name="Unique Visitors"
                stroke="#c89385"
                fillOpacity={1}
                fill="url(#colorVisitors)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trending Albums */}
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-600">
            TRENDING ALBUMS
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingAlbums.map((album) => (
              <div key={album.id} className="flex flex-col">
                <div className="album-cover mb-2">
                  <img src={album.image} alt={album.title} />
                  <div className="play-overlay">
                    <Link to={album.link} className="text-white">
                      <span className="material-icons text-5xl">
                        play_circle_filled
                      </span>
                    </Link>
                  </div>
                </div>
                <h4 className="font-medium text-sm line-clamp-1 mb-1">
                  <Link to={album.link} className="hover:text-cyan">
                    {album.title}
                  </Link>
                </h4>
                <p className="text-gray-500 text-xs">
                  <Link
                    to={`/artist-profile`}
                    className="hover:text-cyan"
                  >
                    {album.artist}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Songs */}
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-600">
            TRENDING SONGS
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingSongs.map((song) => (
              <div key={song.id} className="flex flex-col">
                <div className="album-cover mb-2">
                  <img src={song.image} alt={song.title} />
                  <div className="play-overlay">
                    <Link to={song.link} className="text-white">
                      <span className="material-icons text-5xl">
                        play_circle_filled
                      </span>
                    </Link>
                  </div>
                </div>
                <h4 className="font-medium text-sm line-clamp-1 mb-1">
                  <Link to={song.link} className="hover:text-cyan">
                    {song.title}
                  </Link>
                </h4>
                <p className="text-gray-500 text-xs">
                  <Link
                    to={`/artist-profile`}
                    className="hover:text-cyan"
                  >
                    {song.artist}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Layout for Users and Playlists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* New Users */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-600">
              NEW USERS REGISTERED
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
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-gray-500 text-sm font-medium">
                    #
                  </th>
                  <th className="px-4 py-3 text-gray-500 text-sm font-medium">
                    First Name
                  </th>
                  <th className="px-4 py-3 text-gray-500 text-sm font-medium">
                    Last Name
                  </th>
                  <th className="px-4 py-3 text-gray-500 text-sm font-medium">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody>
                {newUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100"
                  >
                    <td className="px-4 py-3 text-gray-600">
                      {user.id}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.firstName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.lastName}
                    </td>
                    <td className="px-4 py-3">
                      <div className="progress-bar">
                        <div
                          className={`progress-bar-fill ${
                            user.progress < 30
                              ? "coral"
                              : user.progress < 70
                              ? "amber"
                              : "cyan"
                          }`}
                          style={{ width: `${user.progress}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trending Playlists */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-600">
              TRENDING PLAYLISTS
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
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-gray-500 text-sm font-medium">
                    #
                  </th>
                  <th className="px-4 py-3 text-gray-500 text-sm font-medium">
                    Playlist
                  </th>
                  <th className="px-4 py-3 text-gray-500 text-sm font-medium">
                    By
                  </th>
                  <th className="px-4 py-3 text-gray-500 text-sm font-medium">
                    Charts
                  </th>
                </tr>
              </thead>
              <tbody>
                {trendingPlaylists.map((playlist, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100"
                  >
                    <td className="px-4 py-3 text-gray-600">
                      {playlist.id}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {playlist.title}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {playlist.by}
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 flex items-center">
                        {playlist.chart === "green" && (
                          <div className="flex space-x-0.5">
                            <div className="w-1 h-2 bg-cyan"></div>
                            <div className="w-1 h-3 bg-cyan"></div>
                            <div className="w-1 h-1 bg-cyan"></div>
                            <div className="w-1 h-4 bg-cyan"></div>
                            <div className="w-1 h-2 bg-cyan"></div>
                          </div>
                        )}
                        {playlist.chart === "red" && (
                          <div className="flex space-x-0.5">
                            <div className="w-1 h-3 bg-coral"></div>
                            <div className="w-1 h-1 bg-coral"></div>
                            <div className="w-1 h-2 bg-coral"></div>
                            <div className="w-1 h-4 bg-coral"></div>
                            <div className="w-1 h-3 bg-coral"></div>
                          </div>
                        )}
                        {playlist.chart === "amber" && (
                          <div className="flex space-x-0.5">
                            <div className="w-1 h-1 bg-amber"></div>
                            <div className="w-1 h-3 bg-amber"></div>
                            <div className="w-1 h-4 bg-amber"></div>
                            <div className="w-1 h-2 bg-amber"></div>
                            <div className="w-1 h-3 bg-amber"></div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
