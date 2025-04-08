import { Bell, Mail, Menu, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../store/user/asynsActions";
import { logout } from "../../store/user/userSlice";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent());
  }, [dispatch, isLoggedIn]);

  return (
    <header className="w-full flex items-center justify-between bg-gray-800 p-4 shadow-md">
      {/* Logo & Menu */}
      <div className="flex items-center gap-4">
        <div className="bg-teal-600 px-3 py-2 text-white font-bold text-lg flex items-center rounded-lg">
          <span className="italic">SLANT</span>
          <span className="text-xs ml-1">MUSIC</span>
        </div>
      </div>

      {/* Icons & User */}
      <div className="flex items-center gap-5 text-white">
        {/* Thông báo */}
        <div className="relative cursor-pointer">
          <Mail className="hover:text-teal-400 transition" />
          <span className="absolute -top-2 -right-2 bg-teal-500 text-xs text-white rounded-full px-1">
            7
          </span>
        </div>
        <div className="relative cursor-pointer">
          <Bell className="hover:text-red-400 transition" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
            3
          </span>
        </div>

        {/* Nếu đã đăng nhập */}
        {isLoggedIn ? (
          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User"
                  className="w-9 h-9 rounded-full border border-gray-600"
                />
                <span className="absolute top-0 right-0 bg-green-500 w-2.5 h-2.5 rounded-full border border-gray-900"></span>
              </div>
              {/* Tên User */}
              <span className="text-sm font-medium">{`${current?.lastName} ${current?.firstName}`}</span>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-gray-700 font-semibold border-b">{`${current?.lastName} ${current?.firstName}`}</p>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Hồ sơ cá nhân
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  onClick={() => {
                    dispatch(logout());
                    setShowDropdown(false);
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          // Nếu chưa đăng nhập
          <Link to="/login">
            <button className="bg-teal-600 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-teal-500 transition">
              Đăng nhập
            </button>
          </Link>
        )}

        {/* Search */}
        <Search className="opacity-70 cursor-pointer hover:opacity-100 transition" />
      </div>
    </header>
  );
}
