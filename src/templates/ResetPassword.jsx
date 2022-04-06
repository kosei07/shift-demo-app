import React, { useState } from "react";
import { TextInput,PrimaryButton } from "../components/UIkit/index";
import { useDispatch } from "react-redux";
import { setPasswordData } from "../reducks/users/operations";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector } from "react-redux";
import { getUserData } from "../reducks/users/selectors";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@mui/material";
import { setMessage } from "../reducks/message/operations";

const useStyles = makeStyles(() =>
    createStyles({
        cardcontent: {
            width: "80%",
            margin: "auto"
        }
    }))


const ResetPassword = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const user_data = getUserData(selector)
    const id = user_data.id
    const name = user_data.name
    const hashedText = user_data.hashedText


    const [prepassword, setPrepassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const inputPrepassword = (event) => {
        setPrepassword(event.target.value)
    }

    const inputPassword = (event) => {
        setPassword(event.target.value)
    }


    const inputConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }


    const onClick = () => {
        const crypto = require("crypto")

        const sha512 = crypto.createHash('sha512')

        sha512.update(prepassword)


        if (sha512.digest('hex') === hashedText) {
            dispatch(setPasswordData(password, confirmPassword, id))
        } else {
            dispatch(setMessage("error", "旧パスワードが間違っています"))
        }
        setPrepassword("")
        setPassword("")
        setConfirmPassword("")
    }

    return (
        <>
        <div className="spacer_l"></div>
        <div className="spacer_l"></div>
        <div className="spacer_l"></div>
        <Card className={classes.cardcontent}>
            <CardContent>
                <h2>パスワード変更</h2>
                <h2>{name}さん</h2>
                <p>旧パスワードを入力し、新しいパスワードを設定してください。</p>
                <TextInput
                    fullWidth={true} label={"旧パスワード"} multiline={false} required={true}
                    rows={1} value={prepassword} type={"password"} onChange={inputPrepassword}
                />
                <TextInput
                    fullWidth={true} label={"新しいパスワード"} multiline={false} required={true}
                    rows={1} value={password} type={"password"} onChange={inputPassword}
                />
                <TextInput
                    fullWidth={true} label={"新しいパスワード(確認用)"} multiline={false} required={true}
                    rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
                />
                <div className="spacer_m"></div>
                <div className="button_wrap">
                    <PrimaryButton label={"変更する"} color="secondary" onClick={onClick}></PrimaryButton>
                </div>
            </CardContent>

        </Card>
        </>
    )
}

export default ResetPassword;