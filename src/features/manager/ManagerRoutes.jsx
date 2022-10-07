import React from "react";
import { Routes, Route } from "react-router-dom";

import { Configuration, ManagerPage, Submissionperiod } from "./index";

// const Login = lazy(() => import("./Login"));
// const TopPage = lazy(() => import("./TopPage"));

export default function HomeRoutes() {
  return (
    <Routes>
      <Route index element={<ManagerPage />} />
      <Route path="/configuration" element={<Configuration />} />
      <Route path="/submissionperiod" element={<Submissionperiod />} />
    </Routes>
  );
}
