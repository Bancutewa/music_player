import { Route, Routes } from "react-router-dom";
import { layoutAdminRoute } from "../pages/admin/config/adminRoute";
import LayoutAdminContainer from "../pages/admin/config/LayoutAdminContainer";

const RouterComponent = () => {
  return (
    <Routes path="/">
      {layoutAdminRoute.map(
        ({ path, component, isHeader, isSidebar, title }) => (
          <Route
            key={title}
            path={path}
            element={
              <LayoutAdminContainer
                component={component}
                isHeader={isHeader}
                isSidebar={isSidebar}
                title={title}
              />
            }
          />
        )
      )}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default RouterComponent;
