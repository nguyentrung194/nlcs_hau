import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterRoute } from "./route/register.route";
import { LoginRoute } from "./route/login.route";
import { RoomRoute } from "./route/room.route";
import { NavLayout } from "./layouts/nav";
import { PhongContext, PhongContextProvider } from "./contexts/context";
import "./styles/index.css";
import { HotelRoute } from "./route/hotel.route";
import { ClientRoute } from "./route/client.route";
import { ClientLayout } from "./layouts/ClienLayout";
import { ContractRoute } from "./route/contract.route";

function App() {
  const {} = useContext(PhongContext);
  if (false) {
    return (
      <Routes>
        <Route element={<NavLayout />}>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />
          <Route path="/*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <PhongContextProvider>
        <Routes>
          <Route element={<NavLayout />}>
            <Route
              path="/"
              element={<Navigate to="/admin/room" replace={true} />}
            />
            <Route path="/admin/room/:hotelId" element={<RoomRoute />} />
            <Route path="/admin/room" element={<RoomRoute />} />
            <Route path="/admin/hotel/list" element={<HotelRoute />} />
            <Route path="/admin/client" element={<ClientLayout />}>
              <Route path="" element={<Navigate to="guest" replace={true} />} />
              <Route path="guest/:hotelId" element={<ClientRoute />} />
              <Route path="guest" element={<ClientRoute />} />
              <Route path="contract" element={<ContractRoute />} />
            </Route>
            <Route path="/*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </PhongContextProvider>
    );
  }
}

export default App;
