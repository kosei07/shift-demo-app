import * as Actions from './actions'
import initialState from '../store/initialState'

export const PeriodReducer = (state = initialState.period, action) =>{
    switch(action.type){
        case Actions.SET_SUBMISSION_PERIOD:
            return{
                ...action.payload
            }
        case Actions.FETCH_SUBMISSION_PERIOD:
            return{
                ...action.payload
            }
        default:
            return state
    }
}