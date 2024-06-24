import React, { useEffect, useState } from "react";
// react-router components
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "../Components/Header";
// Side Nav Component
import Sidebar from "../Components/Sidebar";
// all routes object
import { defaultRoute, routes } from "./routes";

const Routing = () => {

  const [loginStatus, setLoginStatus] = useState(false);

  // updating component on login status update
  useEffect(() => { 
    setLoginStatus(window.sessionStorage.getItem("access-vs"));
   },[loginStatus]);

  // fetching all routes
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        // if (route.route) {
        //   return (
        //     <Route
        //       exact
        //       path={route.route}
        //       element={route.component}
        //       key={route.key}
        //     />
        //   );
        // }
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return (
          <Route exact path={route.route} element={route.component} key={route.key} />
        );
      }

      return null;
    });
  return (
    <React.Fragment>
      {/* conditional routes rendering */}
      {loginStatus ? (
        <React.Fragment>
          <div className="g-sidenav-show">
            <Router>
              <Sidebar />
              <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
              <Header />
              <Routes>
                {getRoutes(routes)}
                <Route path="/admin/*" element={<Navigate to="/admin/dashboard" />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
              </main>
            </Router>
          </div>
        </React.Fragment>
      ) : (
        <Router>
          <Routes>
            {getRoutes(defaultRoute)}
            <Route path="/admin/*" element={<Navigate to="/admin/sign-in" />} />
            <Route path="*" element={<Navigate to="/admin/sign-in" />} />
          </Routes>
        </Router>
      )}
    </React.Fragment>
  );
};

export default Routing;
