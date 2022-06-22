import React from "react";
import { useSelector } from "react-redux";
import { getLoadingState } from "../../reducks/loading/selectors";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = () => {
  /*--------------ローディング画面---------------*/

  const selector = useSelector((state) => state);
  const isLoading = getLoadingState(selector);

  if (isLoading) {
    return (
      <section className="loading">
        <div className="loading_content">
          <CircularProgress color="inherit" />
          <p>しばらくお待ちください...</p>
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default Loading;
