import React, { lazy } from "react";
// import { Route, Switch } from "react-router";
import { Routes, Route } from "react-router-dom";
import { Header } from "../features/home/components";

import { Login, TopPage, Select } from "../features/home/index";

// const HomeRoute = lazy(() => import("../features/home/HomeRoutes"));
const ManagerRoute = lazy(() => import("../features/manager/ManagerRoutes"));
const StaffRoute = lazy(() => import("../features/staff/StaffRoutes"));
const ChangePassword = lazy(() => import("../features/common/ChangePassword"));
const SetPassword = lazy(() => import("../features/common/SetPassword"));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        {/* <Route path="/*" element={<HomeRoute />} /> */}
        <Route index element={<TopPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select" element={<Select />} />

        <Route path="manager/*" element={<ManagerRoute />} />
        <Route path="staff/*" element={<StaffRoute />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/setpassword" element={<SetPassword />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
