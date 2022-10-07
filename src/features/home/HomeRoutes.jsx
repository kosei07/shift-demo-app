import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, TopPage, Select } from "./index";

// const Login = lazy(() => import("./Login"));
// const TopPage = lazy(() => import("./TopPage"));

export default function HomeRoutes() {
  return (
    <Routes>
      <Route index element={<TopPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/select" element={<Select />} />
    </Routes>
  );
}
