import * as Actions from './actions'
import initialState from '../store/initialState'

export const MessageReducer = (state = initialState.message, action) =>{
    switch(action.type){
        case Actions.SET_MESSAGE:
            return{
                ...action.payload
            }
        case Actions.DELETE_MESSAGE:
            return{
                ...action.payload
            }
        default:
            return state
    }
}