import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { StaffPage } from "./index";

export default function StaffRoutes() {
  return (
    <Routes>
      <Route index element={<StaffPage />} />
    </Routes>
  );
}
