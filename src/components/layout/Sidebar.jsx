import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMusic,
  FaCloudUploadAlt,
  FaEnvelope,
  FaChartBar,
  FaUser,
  FaCompactDisc,
  FaListUl,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import path from "../../utils/path"; // Import đường dẫn

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      name: "Genres",
      icon: <FaMusic />,
      paths: {
        all: path.GENRES_ALL,
        add: path.GENRES_ADD,
        edit: path.GENRES_EDIT,
        view: path.GENRES_VIEW,
      },
    },
    {
      name: "Albums",
      icon: <FaCompactDisc />,
      paths: {
        all: path.ALBUMS_ALL,
        add: path.ALBUMS_ADD,
        edit: path.ALBUMS_EDIT,
        view: path.ALBUMS_VIEW,
      },
    },
    {
      name: "Artists",
      icon: <FaUser />,
      paths: {
        all: path.ARTISTS_ALL,
        add: path.ARTISTS_ADD,
        edit: path.ARTISTS_EDIT,
        view: path.ARTISTS_VIEW,
      },
    },
    {
      name: "Songs",
      icon: <FaMusic />,
      paths: {
        all: path.SONGS_ALL,
        add: path.SONGS_ADD,
        edit: path.SONGS_EDIT,
        view: path.SONGS_VIEW,
      },
    },
    {
      name: "Playlists",
      icon: <FaListUl />,
      paths: {
        all: path.PLAYLISTS_ALL,
        add: path.PLAYLISTS_ADD,
        edit: path.PLAYLISTS_EDIT,
        view: path.PLAYLISTS_VIEW,
      },
    },
  ];

  return (
    <div className="w-64 h-[100%] bg-gray-800 text-white flex flex-col items-center p-4">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          className="w-16 h-16 rounded-full border-2 border-green-400"
        />
        <h3 className="mt-2 text-lg font-semibold">John Douglas</h3>
        <span className="text-sm text-gray-400">Artist</span>
      </div>

      {/* Menu Items */}
      <nav className="w-full">
        <ul className="space-y-2">
          <Link to={path.HOME}>
            <li className="bg-gray-700 p-3 rounded flex items-center gap-3 cursor-pointer">
              <FaTachometerAlt /> <span>Dashboard</span>
            </li>
          </Link>

          {/* Dropdown Menu */}
          {menuItems.map((item) => (
            <li key={item.name}>
              {/* Header của Menu */}
              <div
                className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded justify-between"
                onClick={() => toggleMenu(item.name)}
              >
                <div className="flex items-center gap-3">
                  {item.icon} <span>{item.name}</span>
                </div>
                {openMenu === item.name ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </div>

              {/* Dropdown Links */}
              {openMenu === item.name && (
                <ul className="ml-6 space-y-1">
                  <Link to={item.paths.all}>
                    <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
                      All {item.name}
                    </li>
                  </Link>
                  <Link to={item.paths.add}>
                    <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
                      Add {item.name}
                    </li>
                  </Link>
                  <Link to={item.paths.edit}>
                    <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
                      Edit {item.name}
                    </li>
                  </Link>
                  <Link to={item.paths.view.replace(":id", "1")}>
                    <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
                      View {item.name}
                    </li>
                  </Link>
                </ul>
              )}
            </li>
          ))}

          {/* Other Static Links */}
          <li className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded">
            <FaCloudUploadAlt /> <span>Upload</span>
          </li>
          <li className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded">
            <FaChartBar /> <span>Reports</span>
          </li>
          <li className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded">
            <FaEnvelope /> <span>Mail</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
