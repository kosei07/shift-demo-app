import {
    fetchUserDataAction,
    initializeUserDataAction,
    loginAction,
    setIsSubmittedAction
} from "./actions";
import { push } from "connected-react-router";
import { db} from '../../firebase/index'
import { setMessage } from "../message/operations";



export const listenIdState = () => {
    return async (dispatch) => {
        dispatch(push('/'))
    }
}

export const setPasswordData = (password, confirmPassword, id) => {
    return async (dispatch) => {

        if (!(password && confirmPassword)) {
            dispatch(setMessage("error",<p>未入力の項目があります</p>))
            return
        }

        if (password !== confirmPassword) {
            dispatch(setMessage('error',<p>パスワードと確認用パスワードが一致しません</p>))
            return
        }

        if (password.length < 6) {
            dispatch(setMessage('error',<p>パスワードは6文字以上で入力してください</p>))
            return
        }

        function Validation(password) {
            const rule = /^(?=.*?[a-z])(?=.*?[0-9])/;
            return rule.test(password)
        }

        if (!Validation(password)) {
            dispatch(setMessage('error',<p>パスワードには半角英小文字と半角数字を使用してください</p>))
            return
        }

        const crypto = require("crypto")

        const sha512 = crypto.createHash('sha512')

        sha512.update(password)

        const hashedText = sha512.digest('hex')

        const data = {
            hashedText: hashedText,
        }

        db.collection('users').doc(id).set(data, { merge: true })
            .then(
                dispatch(fetchUserData(id))
            )
    }
}

export const fetchUserData = (id) => {
    return (dispatch, getState) => {

        db.collection('users').doc(id).get()
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
                if (getState().user.hashedText) {
                    dispatch(push('login'))
                } else {
                    dispatch(push('setpassword'))
                }
            })
    }
}


export const login = (password, hashedText, role) => {
    /*----------------------パスワード復号化-----------------*/
    return async (dispatch) => {

        const crypto = require("crypto")

        const sha512 = crypto.createHash('sha512')

        sha512.update(password)

        const compareText = sha512.digest('hex')



        if (!password) {
            dispatch(setMessage('error',<p>パスワードが未入力です</p>))
            return
        }

        if (hashedText === compareText) {
            dispatch(loginAction())
            if (role === "staff") {
                dispatch(push('/staffpage'))
            } else {
                dispatch(push('/managerpage'))
            }
            dispatch(loginAction())
        } else {
            dispatch(setMessage('error',<p>パスワードが間違っています</p>))
        }
    }
}

export const initializeUserData = () => {
    return (dispatch) => {
        dispatch(initializeUserDataAction())
    }
}

export const setIsSubmitted = (id) => {
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