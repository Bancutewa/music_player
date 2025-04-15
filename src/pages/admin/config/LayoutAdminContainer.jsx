import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Header } from "../../../components/layout";
import { Sidebar } from "../../../components/layout";
import ErrorBoundary from "../../../components/layout/ErrorBoundary";
import { admin_path } from "../../../utils/path";
import { getCurrent } from "../../../store/user/asynsActions";
import { logout } from "../../../store/user/userSlice";

const LayoutAdminContainer = ({
  component: Component,
  isHeader,
  isSidebar,
  title,
}) => {
  document.title = `Admin Dashboard - ${title}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(admin_path.LOGIN);
    } else if (!current) {
      dispatch(getCurrent());
    } else if (current.role !== "admin") {
      if (current.role === "user") {
        Swal.fire({
          icon: "error",
          title: "Không có quyền truy cập",
          text: "Chỉ admin mới có thể truy cập trang này!",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(logout());
          navigate(admin_path.LOGIN);
        });
      } else {
        dispatch(logout());
        navigate(admin_path.LOGIN);
      }
    }
  }, [isLoggedIn, current, dispatch, navigate]);

  return (
    <div className="w-full h-screen flex flex-col">
      {isHeader && (
        <Header isLoggedIn={isLoggedIn} current={current} />
      )}
      <div className="flex flex-1">
        {isSidebar && <Sidebar className="w-64" />}
        <div className="flex-1 p-4 overflow-auto">
          <ErrorBoundary>
            <Component />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdminContainer;
