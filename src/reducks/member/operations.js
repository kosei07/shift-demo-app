import { fetchMemberAction, addStaffAction, deleteStaffAction, fetchisNotSubmittedmemberAction } from "./actions";
import { db } from '../../firebase/index'
import { setMessage } from "../message/operations";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { auth } from "../../firebase/index";

export const fetchMember = () => {
    return async (dispatch) => {
        dispatch(showLoadingAction("Plese Wait ..."))//ローディング画面描画
        const array = []
        return auth.signInAnonymously()//匿名でfirebaseにサインイン
            .then(() => {
                db.collection('users').where("role", "==", "staff").get()//スタッフ全員の情報を取得
                    .then(snapshot => {
                        snapshot.forEach(snapshot => {
                            array.push({
                                name: snapshot.data().name,
                                id: snapshot.data().id
                            })
                        })
                        dispatch(fetchMemberAction(array))
                        dispatch(hideLoadingAction())//ローディング画面描画終了
                    })
            }
            )
    }
}

export const fetchisNotSubmittedmember = () => {
    return async (dispatch) => {
        const array = []
        db.collection('users').where("isSubmitted", "==", false).get()//提出可能期間内におけるシフト提出を終えてないスタッフを取得
            .then(snapshot => {
                snapshot.forEach(snapshot => {
                    array.push(snapshot.data().name)
                })
                dispatch(fetchisNotSubmittedmemberAction(array))
            })
    }
}


export const addStaff = (lastName, firstName) => {
    return async (dispatch, getState) => {
        if (lastName === "" || firstName === "") {//姓名に記入漏れがあった時の処理
            dispatch(setMessage('error', <p>追加するスタッフの名前を記入してください</p>))
            return
        }

        var id_length = 10; //idの文字数を10文字とする

        var sample = "abcdefghijklmnopqrstuvwxyz0123456789";  // 生成する文字列に含める文字セット

        var sample_length = sample.length;
        var id = "";
        for (var i = 0; i < id_length; i++) { //id生成
            id += sample[Math.floor(Math.random() * sample_length)];
        }

        db.collection('users').doc(id).set(//スタッフをusersに追加
            {
                isSignedIn: false,
                id: id,
                name: lastName + "　" + firstName,
                hashedText: "",
                role: "staff",
                isSubmitted: false
            }
        ).then(() => {
            /*--------------スタッフリストに追加----------------*/
            const member = getState().member.list
            member.push({ name: lastName + "　" + firstName, id: id })
            dispatch(addStaffAction(member))
        })
    }
}

export const deleteStaff = (id, name) => {
    return async (dispatch, getState) => {
        dispatch(showLoadingAction("Plese Wait ..."))//ローディング画面描画
        db.collection('users').doc(id).delete()//usersからスタッフ情報を削除
        db.collection('shift').doc(name).delete()//shiftからスタッフのシフト情報を削除
            .then(() => {
                const prevMembers = getState().member.list
                const nextMembers = prevMembers.filter(member => member.id !== id)
                dispatch(deleteStaffAction(nextMembers))
            })
        dispatch(hideLoadingAction())//ローディング画面描画終了
    }
}
