import React, { useState, useEffect } from "react";
import { TextInput, PrimaryButton } from "../..//UIkit/index";
import { useDispatch, useSelector } from "react-redux";
import { setPasswordData } from "../../reducks/users/operations";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getUserData } from "../../reducks/users/selectors";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    cardcontent: {
      width: "80%",
      margin: "auto",
    },
  })
);

const SetPassword = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_data = getUserData(selector);
  const { id, name, hashedtext } = user_data;

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
    if (hashedtext) {
      navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashedtext]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputPassword = (event) => {
    //パスワードの入力時の処理
    setPassword(event.target.value);
  };

  const inputConfirmPassword = (event) => {
    //確認用パスワードの入力時の処理
    setConfirmPassword(event.target.value);
  };

  const onClick = () => {
    //設定するをそした時の処理
    dispatch(setPasswordData(password, confirmPassword, id));
    navigate("/home/login");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="main_wrap">
      <div className="spacer_l"></div>
      <div className="spacer_l"></div>
      <div className="spacer_l"></div>
      <div className="spacer_l"></div>
      <Card className={classes.cardcontent}>
        <CardContent>
          <h2>パスワード設定</h2>
          <h2>{name}さん</h2>
          <p>
            ※半角英小文字と半角数字を用いて
            <br />
            6文字以上でパスワードを設定してください。
          </p>
          <TextInput
            fullWidth={true}
            label={"パスワード"}
            multiline={false}
            required={true}
            rows={1}
            value={password}
            type={"password"}
            onChange={inputPassword}
            placeholder={"(例)　abcd1234"}
          />
          <TextInput
            fullWidth={true}
            label={"パスワード(確認用)"}
            multiline={false}
            required={true}
            rows={1}
            value={confirmPassword}
            type={"password"}
            onChange={inputConfirmPassword}
            placeholder={"(例)　abcd1234"}
          />
          <div className="spacer_m"></div>
          <div className="button_wrap">
            <PrimaryButton
              label={"設定する"}
              color="secondary"
              onClick={onClick}
            ></PrimaryButton>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default SetPassword;
