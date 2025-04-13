import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../../components/layout";
import { Sidebar } from "../../../components/layout";

const LayoutAdminContainer = ({
  component: Component,
  isHeader,
  isSidebar,
  title,
}) => {
  document.title = `Admin Dashboard - ${title}`;
  return (
    <div className="w-full h-screen flex flex-col">
      {isHeader && <Header />}
      <div className="flex flex-1">
        {isSidebar && <Sidebar className="w-64" />}
        <div className="flex-1 p-4 overflow-auto">
          <Component />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdminContainer;
