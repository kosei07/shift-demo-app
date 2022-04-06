import { setMessageAction, deleteMessageAction } from "./actions"

export const setMessage = (type,text) => {
    /*----------------メッセージをセット-------------------*/
    return async (dispatch) => {
        dispatch(setMessageAction({
                type:type,
                text:text
            }))
    }
}

export const deleteMessage = () => {
        /*----------------メッセージを削除-------------------*/
    return async (dispatch) => {
        dispatch(deleteMessageAction({message:""}))
    }
}

