import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getUserData } from './reducks/users/selectors';
import { listenIdState } from './reducks/users/operations';
const IdCheck = ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const user_data = getUserData(selector)
    const id = user_data.id
    useEffect(() => {
        if (!id) {
            dispatch(listenIdState())
        }
    });

    console.log()
    
    if (id) {
        return children
    }else{
        return <></>
    }
};

export default IdCheck;

