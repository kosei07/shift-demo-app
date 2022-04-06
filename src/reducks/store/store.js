import {
    createStore as reduxCrateStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import { connectRouter, routerMiddleware } from 'connected-react-router';

import thunk from 'redux-thunk';

import { LoadingReducer } from '../loading/reducers';
import { UserReducer } from '../users/reducers';
import { MonthReducer } from '../shift/reducers';
import { MemberReducer } from '../member/reducers';
import { PeriodReducer } from '../period/reducers';
import { MessageReducer } from '../message/reducers';

export default function crateStore(history){
    return reduxCrateStore(
        combineReducers({
            loading:LoadingReducer,
            message:MessageReducer,
            month: MonthReducer,
            user: UserReducer,
            member: MemberReducer,
            period:PeriodReducer,
            router: connectRouter(history)
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}
