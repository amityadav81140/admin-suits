import React from "react";
import { Outlet } from "react-router-dom";

const Settings = (props) => {
  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  );
};

export default Settings;
