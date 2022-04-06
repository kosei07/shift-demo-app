import React from "react";
// import { Route, Routes } from "react-router-dom"
import { Route, Switch } from "react-router"
import { TopPage, StaffPage, ManagerPage, Configuration, Login, SetPassword, ResetPassword, Submissionperiod } from "./templates/index"
import IdCheck from "./IdCheck";

const Router = () => {
    return (
        <Switch>
            <Route exact path='(/)?' component={TopPage} />
            <IdCheck>
                <Route path='/setpassword' component={SetPassword} />
                <Route path='/resetpassword' component={ResetPassword} />
                <Route path='/login(/)?' component={Login} />
                <Route path='/staffpage' component={StaffPage} />
                <Route exact path='/managerpage' component={ManagerPage} />
                <Route exact path='/managerpage/configuration' component={Configuration} />
                <Route exact path='/managerpage/shiftperiod' component={Submissionperiod} />
            </IdCheck>
        </Switch>
    )
}

export default Router