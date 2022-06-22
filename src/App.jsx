import React, { useEffect } from "react";
import Router from "./Router";
import "./assets/style.css";
import "./assets/template.css";
import "./assets/reset.css";
import { Header } from "./components/Header/index";
import { auth } from "./firebase";
import { MessageComponent, Loading } from "./components/UIkit/index";

const App = () => {
  useEffect(() => {
    auth.signInAnonymously();
  }, []);

  return (
    <>
      <MessageComponent />
      <Loading />

      <Header />
      <main className="main_wrap">
        <Router />
      </main>
    </>
  );
};

export default App;
