import * as Actions from './actions'
import initialState from '../store/initialState'

export const MemberReducer = (state = initialState.member, action) =>{
    switch(action.type){
        case Actions.FETCH_MEMBER:
            return{
                list : action.payload
            }
        case Actions.ISNOT_SUBMITTED_MEMBER:
            return{
                list : action.payload
            }
        case Actions.ADD_STAFF:
            return{
                ...state.list,
                list : action.payload
            }
        case Actions.DELETE_STAFF:
            return{
                ...state.list,
                list : action.payload
            }
        default:
            return state
    }
}