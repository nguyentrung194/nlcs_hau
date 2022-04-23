import React from "react";

import { Outlet } from "react-router-dom";
import { ClientNav } from "../components/nav/ClientNav";

export const ClientLayout = () => {
  return (
    <div>
      <ClientNav />
      <Outlet />
    </div>
  );
};
