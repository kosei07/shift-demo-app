import * as Actions from './actions'
import initialState from '../store/initialState'

export const MonthReducer = (state = initialState.month, action) =>{
    switch(action.type){
        case Actions.SET_WORKTIME:
            return{
                ...state,
                ...action.payload
            }
        case Actions.CLEAR_WORKTIME:
            return{
                ...state,
                ...action.payload
            }
        case Actions.FETCH_MONTH_DATA:
            return{
                ...action.payload
            }
        case Actions.CLEAR_MONTH_DATA:
            return {
                ...initialState.month
            }
        case Actions.FETCH_EVERYONE_MONTH_DATA:
            return{
                ...state,
                ...action.payload
            }
        case Actions.INITIALIZE_MONTHDATA:
            return initialState.month
        default:
            return state
    }
}