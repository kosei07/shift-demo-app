import { fetchMemberAction, addStaffAction, deleteStaffAction, fetchisNotSubmittedmemberAction } from "./actions";
import { db } from '../../firebase/index'
import { setMessage } from "../message/operations";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { auth } from "../../firebase/index";

export const fetchMember = () => {
    return async (dispatch) => {
        dispatch(showLoadingAction("Plese Wait ..."))
        const array = []
        return auth.signInAnonymously()
            .then(() => {
                db.collection('users').where("role", "==", "staff").get()
                    .then(snapshot => {
                        snapshot.forEach(snapshot => {
                            array.push({
                                name: snapshot.data().name,
                                id: snapshot.data().id
                            })
                        })
                        dispatch(fetchMemberAction(array))
                        dispatch(hideLoadingAction())
                    })
            }
            )
    }
}

export const fetchisNotSubmittedmember = () => {
    return async (dispatch) => {
        const array = []
        db.collection('users').where("isSubmitted", "==", false).get()
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
        if (lastName === "" || firstName === "") {
            dispatch(setMessage('error', <p>追加するスタッフの名前を記入してください</p>))
            return
        }

        var id_length = 10;

        // 生成する文字列に含める文字セット
        var sample = "abcdefghijklmnopqrstuvwxyz0123456789";

        var sample_length = sample.length;
        var id = "";
        for (var i = 0; i < id_length; i++) {
            id += sample[Math.floor(Math.random() * sample_length)];
        }

        db.collection('users').doc(id).set(
            {
                isSignedIn: false,
                id: id,
                name: lastName + "　" + firstName,
                hashedText: "",
                role: "staff",
                isSubmitted: false
            }
        ).then(() => {
            const member = getState().member.list
            member.push({ name: lastName + "　" + firstName, id: id })
            dispatch(addStaffAction(member))
        })
    }
}

export const deleteStaff = (id, name) => {
    return async (dispatch, getState) => {
        dispatch(showLoadingAction("Plese Wait ..."))
        db.collection('users').doc(id).delete()
        db.collection('shift').doc(name).delete()
            .then(() => {
                const prevMembers = getState().member.list
                const nextMembers = prevMembers.filter(member => member.id !== id)
                dispatch(deleteStaffAction(nextMembers))
            })
        dispatch(hideLoadingAction())
    }
}
