import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMusic,
  FaCloudUploadAlt,
  FaEnvelope,
  FaChartBar,
  FaUser,
  FaCompactDisc,
  FaListUl,
} from "react-icons/fa";
import { Menu, Avatar, Typography } from "antd";
import { admin_path } from "../../utils/path";

const { SubMenu } = Menu;
const { Title } = Typography;

const Sidebar = ({ isLoggedIn, current }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Genres",
      icon: <FaMusic />,
      paths: {
        all: admin_path.GENRES_ALL,
        add: admin_path.GENRES_ADD,
        edit: admin_path.GENRES_EDIT,
        view: admin_path.GENRES_VIEW,
      },
    },
    {
      name: "Albums",
      icon: <FaCompactDisc />,
      paths: {
        all: admin_path.ALBUMS_ALL,
        add: admin_path.ALBUMS_ADD,
        edit: admin_path.ALBUMS_EDIT,
        view: admin_path.ALBUMS_VIEW,
      },
    },
    {
      name: "Artists",
      icon: <FaUser />,
      paths: {
        all: admin_path.ARTISTS_ALL,
        add: admin_path.ARTISTS_ADD,
        edit: admin_path.ARTISTS_EDIT,
        view: admin_path.ARTISTS_VIEW,
      },
    },
    {
      name: "Songs",
      icon: <FaMusic />,
      paths: {
        all: admin_path.SONGS_ALL,
        add: admin_path.SONGS_ADD,
        edit: admin_path.SONGS_EDIT,
        view: admin_path.SONGS_VIEW,
      },
    },
    {
      name: "Playlists",
      icon: <FaListUl />,
      paths: {
        all: admin_path.PLAYLISTS_ALL,
        add: admin_path.PLAYLISTS_ADD,
        edit: admin_path.PLAYLISTS_EDIT,
        view: admin_path.PLAYLISTS_VIEW,
      },
    },
  ];

  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    const keys = [];

    menuItems.forEach((item) => {
      Object.entries(item.paths).forEach(([key, path]) => {
        // Khớp chính xác
        if (currentPath === path) {
          keys.push(path);
        }
        // Khớp với tuyến đường động (edit, view)
        else if (path.includes(":id")) {
          const basePath = path.split("/:")[0];
          const pathSegments = currentPath.split("/");
          const baseSegments = basePath.split("/");
          if (
            currentPath.startsWith(basePath) &&
            pathSegments.length === baseSegments.length + 1 &&
            pathSegments[pathSegments.length - 1] !== ""
          ) {
            keys.push(path);
          }
        }
      });
    });

    if (currentPath === admin_path.HOME) {
      keys.push(admin_path.HOME);
    } else if (currentPath === "/upload") {
      keys.push("/upload");
    } else if (currentPath === "/reports") {
      keys.push("/reports");
    } else if (currentPath === "/mail") {
      keys.push("/mail");
    }

    return keys;
  };

  const getDefaultOpenKeys = () => {
    const currentPath = location.pathname;
    return menuItems
      .filter((item) =>
        Object.values(item.paths).some((path) =>
          currentPath.startsWith(path.split("/:")[0])
        )
      )
      .map((item) => item.name);
  };

  const [openMenu, setOpenMenu] = useState(getDefaultOpenKeys);

  useEffect(() => {
    setOpenMenu(getDefaultOpenKeys());
  }, [location.pathname]);

  const handleOpenChange = (openKeys) => {
    setOpenMenu(openKeys);
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col p-4">
      <div className="flex flex-col items-center mb-6">
        <Avatar
          size={64}
          src="https://randomuser.me/api/portraits/men/1.jpg"
          className="border-2 border-green-400"
        />
        <Title
          level={4}
          style={{ color: "white", margin: "8px 0 0 0" }}
        >
          {current?.firstName} {current?.lastName}
        </Title>
        <span className="text-sm text-gray-400">{current.role}</span>
      </div>

      <Menu
        mode="inline"
        theme="dark"
        openKeys={openMenu}
        onOpenChange={handleOpenChange}
        selectedKeys={getSelectedKeys()}
        style={{ background: "transparent", border: "none" }}
      >
        <Menu.Item key={admin_path.HOME} icon={<FaTachometerAlt />}>
          <Link to={admin_path.HOME}>Dashboard</Link>
        </Menu.Item>

        {menuItems.map((item) => (
          <SubMenu key={item.name} icon={item.icon} title={item.name}>
            <Menu.Item key={item.paths.all}>
              <Link to={item.paths.all}>All {item.name}</Link>
            </Menu.Item>
            <Menu.Item key={item.paths.add}>
              <Link to={item.paths.add}>Add {item.name}</Link>
            </Menu.Item>
            <Menu.Item key={item.paths.edit}>
              <Link to={item.paths.edit.replace(":id", "1")}>
                Edit {item.name}
              </Link>
            </Menu.Item>
            <Menu.Item key={item.paths.view}>
              <Link to={item.paths.view.replace(":id", "1")}>
                View {item.name}
              </Link>
            </Menu.Item>
          </SubMenu>
        ))}

        <Menu.Item key="/upload" icon={<FaCloudUploadAlt />}>
          <Link to="/upload">Upload</Link>
        </Menu.Item>
        <Menu.Item key="/reports" icon={<FaChartBar />}>
          <Link to="/reports">Reports</Link>
        </Menu.Item>
        <Menu.Item key="/mail" icon={<FaEnvelope />}>
          <Link to="/mail">Mail</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
