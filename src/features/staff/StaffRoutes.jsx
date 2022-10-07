import React from "react";
import { Routes, Route } from "react-router-dom";

import { StaffPage } from "./index";

export default function StaffRoutes() {
  return (
    <Routes>
      <Route index element={<StaffPage />} />
    </Routes>
  );
}
