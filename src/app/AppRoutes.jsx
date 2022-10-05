import React from "react";
import { Route, Switch } from "react-router";
import Auth from "./Auth";

const ChangePassword = React.lazy(() =>
  import("../features/common/ChangePassword")
);
const SetPassword = React.lazy(() => import("../features/common/SetPassword"));
const Login = React.lazy(() => import("../features/home/Login"));
const Select = React.lazy(() => import("../features/home/Select"));
const TopPage = React.lazy(() => import("../features/home/TopPage"));
const Configuration = React.lazy(() =>
  import("../features/manager/Configuration")
);
const ManagerPage = React.lazy(() => import("../features/manager/ManagerPage"));
const Submissionperiod = React.lazy(() =>
  import("../features/manager/Submissionperiod")
);
const StaffPage = React.lazy(() => import("../features/staff/StaffPage"));

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/select" component={Select} />
      <Route exact path="(/)?" component={TopPage} />
      <Route path="/login" component={Login} />
      <Route path="/setpassword" component={SetPassword} />
      <Auth>
        <Route path="/changepassword" component={ChangePassword} />
        <Route exact path="/staff" component={StaffPage} />
        <Route exact path="/manager" component={ManagerPage} />
        <Route exact path="/manager/configuration" component={Configuration} />
        <Route exact path="/manager/shiftperiod" component={Submissionperiod} />
      </Auth>
    </Switch>
  );
};
export default AppRouter;
