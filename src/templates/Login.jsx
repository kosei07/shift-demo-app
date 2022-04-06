import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { getUserData } from "../reducks/users/selectors";
import { TextInput,PrimaryButton } from "../components/UIkit/index";
import { useState } from "react";
import { login } from "../reducks/users/operations";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@mui/material";

const useStyles = makeStyles(() =>
    createStyles({
        cardcontent: {
            width: "80%",
            margin: "auto"
        }
    }))


const Login = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const user_data = getUserData(selector)

    const hashedText = user_data.hashedText
    const name = user_data.name
    const role = user_data.role

    const [password, setPassword] = useState("")

    const inputPassword = (event) => {//パスワードの入力時の処理
        setPassword(event.target.value)
    }

    return (
        <>
            <div className="spacer_l"></div>
            <div className="spacer_l"></div>
            <div className="spacer_l"></div>
            <div className="spacer_l"></div>
            <Card className={classes.cardcontent}>
                <CardContent>
                    <h2>ログイン画面</h2>
                    <h2>{name}さん</h2>
                    <p>※自分で設定したパスワードを入力してください</p>
                    <TextInput
                        fullWidth={true} label={"パスワード"} multiline={false} required={true}
                        rows={1} value={password} type={"password"} onChange={inputPassword}
                    />
                    <div className="spacer_m"></div>
                    <div className="button_wrap">
                        <PrimaryButton label={"ログイン"} color="secondary" onClick={() => { dispatch(login(password,hashedText ,role)); setPassword('') }}></PrimaryButton>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Login