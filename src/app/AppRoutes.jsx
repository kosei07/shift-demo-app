import React, { lazy,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../features/home/components";
import { Login, TopPage, Select } from "../features/home/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../reducks/users/selectors";


const ManagerRoute = lazy(() => import("../features/manager/ManagerRoutes"));
const StaffRoute = lazy(() => import("../features/staff/StaffRoutes"));
const ChangePassword = lazy(() => import("../features/common/ChangePassword"));
const SetPassword = lazy(() => import("../features/common/SetPassword"));

const AppRouter = () => {

  const selector = useSelector((state) => state);
  const user_data = getUserData(selector);
  const { name, isSignedIn, role, hashedText } = user_data;

  console.log(user_data)
  const navigate = useNavigate()


  useEffect(() => {
    if (!name) {
      navigate("/");
    } else {
      if (!hashedText) {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (isSignedIn) {
      if (role === "manager") {
        navigate("/manager");
      } else {
        navigate("/staff");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);




  return (
    <Routes>
      <Route path="/" element={<Header />}>
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
