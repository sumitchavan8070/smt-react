import React from "react";
import { AuthProvider } from "./Context/authContext";
import ScreenMenu from "./Components/Menus/ScreenMenu";
// import ScreenMenu from "./lib/utility/navigaton/routes";

const RouteNavigation = () => {
  return (

    <AuthProvider>
      <ScreenMenu></ScreenMenu>
    </AuthProvider>
  );
};

export default RouteNavigation;
