import React from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../reducks/users/operations";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@mui/material";
import { PrimaryButton } from "../../UIkit/index";
import Divider from "@material-ui/core/Divider";
// import { useNavigate } from "react-router-dom";
import { push } from "connected-react-router";

const useStyles = makeStyles(() =>
  createStyles({
    cardcontent: {
      width: "80%",
      margin: "auto",
    },
  })
);

const TopPage = () => {
  // const navigate = useNavigate();

  const classes = useStyles();

  const dispatch = useDispatch();

  const onClickManagerPage = () => {
    dispatch(fetchUserData("kyv39ixrt0")); // 管理者のデータを取得
  };
  const onClickStaffPage = () => {
    dispatch(push("/select"));
  };

  return (
    <>
      <div className="spacer_l"></div>
      <div className="spacer_l"></div>
      <div className="spacer_l"></div>
      <div className="spacer_l"></div>
      <Card className={classes.cardcontent}>
        <CardContent>
          <h2>①②から選択してください</h2>
          <Divider />
          <p>
            ①「管理者」としてスタッフ全員のシフトや提出状況を確認したい方はこちら
          </p>
          <div className="spacer_s"></div>
          <div className="text_center">
            <PrimaryButton
              label={"管理者専用ページへ"}
              color="secondary"
              onClick={async () => {
                onClickManagerPage();
                // 管理者のデータを取得
              }}
            ></PrimaryButton>
          </div>
          <div className="spacer_m"></div>
          <Divider />
          <div className="spacer_s"></div>
          <p>②「スタッフ」としてシフトの提出や確認をしたい方はこちら</p>
          <div className="text_center">
            <PrimaryButton
              label={"スタッフ専用ページへ"}
              color="secondary"
              onClick={() => {
                onClickStaffPage();
              }}
            ></PrimaryButton>
          </div>
          <div className="spacer_s"></div>
        </CardContent>
      </Card>
    </>
  );
};

export default TopPage;
