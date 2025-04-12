import React, { useState } from "react";
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
import { Menu, Avatar, Typography } from "antd"; // Thêm các thành phần từ antd
import path from "../../utils/path";

const { SubMenu } = Menu;
const { Title } = Typography;

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState([]); // Sử dụng mảng để theo dõi các menu mở
  const location = useLocation();

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

  // Hàm kiểm tra xem đường dẫn hiện tại có khớp với path không
  const isActive = (pathToCheck) => {
    if (pathToCheck === "") {
      return location.pathname === "/"; // Chỉ active Dashboard khi ở trang chính xác "/"
    }
    return (
      location.pathname === `/${pathToCheck}` ||
      location.pathname.startsWith(`/${pathToCheck.split("/:")[0]}`)
    );
  };

  // Xử lý khi mở/đóng SubMenu
  const handleOpenChange = (openKeys) => {
    setOpenMenu(openKeys);
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col p-4">
      {/* Profile Section */}
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
          John Douglas
        </Title>
        <span className="text-sm text-gray-400">Artist</span>
      </div>

      {/* Menu Items */}
      <Menu
        mode="inline"
        theme="dark"
        openKeys={openMenu}
        onOpenChange={handleOpenChange}
        selectedKeys={Object.values(path).filter(isActive)} // Chọn các menu dựa trên đường dẫn hiện tại
        style={{ background: "transparent", border: "none" }}
      >
        <Menu.Item
          key={path.HOME}
          icon={<FaTachometerAlt />}
          className={
            isActive(path.HOME) ? "ant-menu-item-selected" : ""
          }
        >
          <Link to={path.HOME}>Dashboard</Link>
        </Menu.Item>

        {/* Dropdown Menu */}
        {menuItems.map((item) => (
          <SubMenu
            key={item.name}
            icon={item.icon}
            title={item.name}
            className={
              Object.values(item.paths).some(isActive)
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <Menu.Item key={item.paths.all}>
              <Link to={item.paths.all}>All {item.name}</Link>
            </Menu.Item>
            <Menu.Item key={item.paths.add}>
              <Link to={item.paths.add}>Add {item.name}</Link>
            </Menu.Item>
            <Menu.Item key={item.paths.edit.replace(":id", "1")}>
              <Link to={item.paths.edit.replace(":id", "1")}>
                Edit {item.name}
              </Link>
            </Menu.Item>
            <Menu.Item key={item.paths.view.replace(":id", "1")}>
              <Link to={item.paths.view.replace(":id", "1")}>
                View {item.name}
              </Link>
            </Menu.Item>
          </SubMenu>
        ))}

        {/* Other Static Links */}
        <Menu.Item key="upload" icon={<FaCloudUploadAlt />}>
          <Link to="/upload">Upload</Link>
        </Menu.Item>
        <Menu.Item key="reports" icon={<FaChartBar />}>
          <Link to="/reports">Reports</Link>
        </Menu.Item>
        <Menu.Item key="mail" icon={<FaEnvelope />}>
          <Link to="/mail">Mail</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
