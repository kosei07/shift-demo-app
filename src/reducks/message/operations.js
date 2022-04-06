import { setMessageAction, deleteMessageAction } from "./actions"

export const setMessage = (type,text) => {
    return async (dispatch) => {
        dispatch(setMessageAction({
                type:type,
                text:text
            }))
    }
}

export const deleteMessage = () => {
    return async (dispatch) => {
        dispatch(deleteMessageAction({message:""}))
    }
}

