import * as Actions from './actions'
import initialState from '../store/initialState'

export const UserReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case Actions.USER_STAFFDATA:
            return {
                ...action.payload
            }
        case Actions.LOGIN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SET_ISSUBMITTED:
            return {
                ...state,
                ...action.payload
            }
        case Actions.INITIALIZE_USERDATA:
            return initialState.user
        default:
            return state
    }
}