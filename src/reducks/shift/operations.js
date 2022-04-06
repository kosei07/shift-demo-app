import { setWorktimeAction, fetchMonthDataAction, fetchEveryoneMonthDataAction, clearMonthDataAction,initializeMonthDataAction, clearWorktimeAction} from "./actions";
import { db , FieldValue } from '../../firebase/index'
import { setMessage } from "../message/operations";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";


export const setWorktime = (date,start,finish,comment,holidayCheckbox)=>{
    return async (dispach)=>{
        if(holidayCheckbox){
            const obj = {}
            const data = {start:"希望休" , finish:"", comment: comment}
            const keyname = date
            obj[keyname]= data
            dispach(setWorktimeAction(obj))  
            return  
        }
        if(!comment){
            comment = ""
        }
    
        const obj = {}
        const data = {start:start , finish:finish, comment: comment}
        const keyname = date
        obj[keyname]= data
        dispach(setWorktimeAction(obj))
    }
}
export const clearWorktime = (date)=>{
    return async (dispach)=>{
        const obj = {}
        const data = {}
        const keyname = date
        obj[keyname]= data

        dispach(clearWorktimeAction(obj))
    }
}

export const submitMonthData=(name, month, month_data)=>{
    const data = {}
    data[month] = month_data
    return async (dispacth)=>{
        db.collection('shift')
        .doc(name)
        .set(data, { merge: true })
        .then(
            dispacth(setMessage("comment",<p>提出が完了しました</p>))
            )
        }
}

export const fetchMyMonthData=(month,name)=>{
    return async (dispatch)=>{
        dispatch(showLoadingAction("Please Wait..."));
        db.collection('shift')
        .doc(name)
        .get()
        .then(snapshot=>{
            const data = snapshot.data()
            if(data){
                const month_data = data[month]
                if(month_data){
                dispatch(fetchMonthDataAction(data[month])) 
                }  else{
                    dispatch(clearMonthDataAction())
                    } 
            } else {
                dispatch(clearMonthDataAction())
            }
            dispatch(hideLoadingAction());
        })
        }
}

export const fetchEveryoneMonthData = (month)=>{

    const today = new Date()
    const preMonth = (today.getMonth() !== 0 )? today.getMonth() : 12 ;
    const object = {
        1: {list:{},length:0},
        2: {list:{},length:0},
        3: {list:{},length:0},
        4: {list:{},length:0},
        5: {list:{},length:0},
        6: {list:{},length:0},
        7: {list:{},length:0},
        8: {list:{},length:0},
        9: {list:{},length:0},
        10: {list:{},length:0},
        11: {list:{},length:0},
        12: {list:{},length:0},
        13: {list:{},length:0},
        14: {list:{},length:0},
        15: {list:{},length:0},
        16: {list:{},length:0},
        17: {list:{},length:0},
        18: {list:{},length:0},
        19: {list:{},length:0},
        20: {list:{},length:0},
        21: {list:{},length:0},
        22: {list:{},length:0},
        23: {list:{},length:0},
        24: {list:{},length:0},
        25: {list:{},length:0},
        26: {list:{},length:0},
        27: {list:{},length:0},
        28: {list:{},length:0},
        29: {list:{},length:0},
        30: {list:{},length:0},
        31: {list:{},length:0},
    }

    return async (dispacth)=>{
        db.collection('shift').get()
        .then((snapshot)=>{
            snapshot.forEach((snapshot)=>{
                const name = snapshot.id
                const data = snapshot.data()[month]                
                const preMonthData = snapshot.data()[preMonth]
                if(data){
                const data_length = Object.keys(data).length
                for(let i = 1; i <= data_length;i++){
                    if(Object.keys(data[i]).length){
                        const obj ={}
                        obj[name] = data[i]
                        object[i].list[name] = obj
                        object[i]['length'] = object[i]['length']+1
                    }
                } 
            }
            if(preMonthData){
                db.collection('shift')
                .doc(name)
                .update({[preMonth]: FieldValue.delete()})
            }
            })
            dispacth(fetchEveryoneMonthDataAction(object))
            })
    }
}

export const  initializeMonthData =()=>{
    return (dispatch)=>{
        dispatch(initializeMonthDataAction())
    }
}