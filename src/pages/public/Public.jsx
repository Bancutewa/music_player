import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout";
import { Sidebar } from "../../components/layout";

const Public = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar nằm bên trái, chiếm cố định 16rem (64px * 4) */}
        <Sidebar className="w-64" />
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Public;
