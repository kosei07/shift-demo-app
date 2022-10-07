import React, { useEffect } from "react";
import AppRouter from "./AppRoutes";
import "../assets/style.css";
import "../assets/template.css";
import "../assets/reset.css";
import { auth } from "../firebase";
import { MessageComponent, Loading } from "../UIkit/index";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  useEffect(() => {
    auth.signInAnonymously();
  }, []);

  return (
    <React.Suspense fallback="loading...">
      <MessageComponent />
      <Loading />
      {/* <Header /> */}
      {/* <main className="main_wrap"> */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      {/* </main> */}
    </React.Suspense>
  );
};

export default App;
