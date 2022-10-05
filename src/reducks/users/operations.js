import {
    fetchUserDataAction,
    initializeUserDataAction,
    loginAction,
    setIsSubmittedAction
} from "./actions";
import { push } from "connected-react-router";
import { db } from '../../firebase/index'
import { setMessage } from "../message/operations";


export const setPasswordData = (password, confirmPassword, id) => {
    return async (dispatch) => {
        /*-----------------------バリデーション-----------------------*/
        if (!(password && confirmPassword)) {
            dispatch(setMessage("error", <p>未入力の項目があります</p>))
            return
        }

        if (password !== confirmPassword) {
            dispatch(setMessage('error', <p>パスワードと確認用パスワードが一致しません</p>))
            return
        }

        if (password.length < 6) {
            dispatch(setMessage('error', <p>パスワードは6文字以上で入力してください</p>))
            return
        }

        function Validation(password) {
            const rule = /^(?=.*?[a-z])(?=.*?[0-9])/;
            return rule.test(password)
        }

        if (!Validation(password)) {
            dispatch(setMessage('error', <p>パスワードには半角英小文字と半角数字を使用してください</p>))
            return
        }

        /*-----------------------パスワードのハッシュ化-----------------------*/
        const crypto = require("crypto")

        const sha512 = crypto.createHash('sha512')

        sha512.update(password)

        const hashedText = sha512.digest('hex')

        const data = {
            hashedText: hashedText,
        }

        db.collection('users').doc(id).set(data, { merge: true })//スタッフの情報をusersに追加
            .then(
                dispatch(fetchUserData(id))
            )
    }
}

export const fetchUserData = (id) => {
    return (dispatch, getState) => {
        db.collection('users').doc(id).get()//ユーザーの情報を取得
            .then(snapshot => {
                const data = snapshot.data()
                dispatch(fetchUserDataAction({
                    isSignedIn: data.isSignedIn,
                    id: data.id,
                    name: data.name,
                    hashedText: data.hashedText,
                    role: data.role,
                    isSubmitted: data.isSubmitted
                }))
                if (getState().user.hashedText) {//パスワードが設定されている時の処理
                    dispatch(push('/login'))
                } else {//パスワードが未設定の時の処理
                    dispatch(push('/setpassword'))
                }
            })
    }
}


export const login = (password) => {
    /*----------------------パスワード復号化-----------------*/
    return async (dispatch, getState) => {

        const { hashedText, role } = getState().user

        const crypto = require("crypto")

        const sha512 = crypto.createHash('sha512')

        sha512.update(password)

        const compareText = sha512.digest('hex')


        if (!password) {//パスワードが未入力の時の処理
            dispatch(setMessage('error', <p>パスワードが未入力です</p>))
            return
        }

        if (hashedText === compareText) {//パスワードが合致している時の処理
            dispatch(loginAction())
            if (role === "staff") {//ユーザーがスタッフの時の処理
                dispatch(push('/staff'))
            } else {//ユーザーが管理者の時の処理
                dispatch(push('/manager'))
            }
        } else {//パスワードが間違っている時の処理
            dispatch(setMessage('error', <p>パスワードが間違っています</p>))
        }
    }
}

export const initializeUserData = () => {
    /*-----------------------userの初期化-----------------------*/

    return (dispatch) => {
        dispatch(initializeUserDataAction())
    }
}

export const setIsSubmitted = (id) => {
    /*-----------------------スタッフのシフト提出状況を提出済みにする-----------------------*/
    return (dispatch) => {
        db.collection('users')
            .doc(id)
            .set({ isSubmitted: true }, { merge: true })
            .then(() => {
                dispatch(setIsSubmittedAction({ isSubmitted: true }))
            }
            )
    }
}