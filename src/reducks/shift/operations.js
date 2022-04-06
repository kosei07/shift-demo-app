import { setWorktimeAction, fetchMonthDataAction, fetchEveryoneMonthDataAction, clearMonthDataAction,initializeMonthDataAction, clearWorktimeAction} from "./actions";
import { db , FieldValue } from '../../firebase/index'
import { setMessage } from "../message/operations";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";


export const setWorktime = (date,start,finish,comment,holidayCheckbox)=>{
    return async (dispach)=>{
        if(holidayCheckbox){//希望休の場合の処理
            const obj = {}
            const data = {start:"希望休" , finish:"", comment: comment}
            const keyname = date
            obj[keyname]= data
            dispach(setWorktimeAction(obj))  
            return  
        }

        if(!comment){//コメントがない時、コメントを空文字にする
            comment = ""
        }
    
        const obj = {}
        const data = {start:start , finish:finish, comment: comment}
        const keyname = date
        obj[keyname]= data
        dispach(setWorktimeAction(obj))//stateを変更
    }
}
export const clearWorktime = (date)=>{
    return async (dispach)=>{
        const obj = {}
        const data = {}
        const keyname = date
        obj[keyname]= data

        dispach(clearWorktimeAction(obj))//セットされているシフトの情報を削除
    }
}

export const submitMonthData=(name, month, month_data)=>{
    const data = {}
    data[month] = month_data
    return async (dispacth)=>{//シフトの情報をshiftに追加する
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
        dispatch(showLoadingAction("Please Wait..."));//ローディング画面描画
        db.collection('shift')//スタッフのシフト情報を取得
        .doc(name)
        .get()
        .then(snapshot=>{
            const data = snapshot.data()
            if(data){//スタッフのシフト情報がfirestoreにある時の処理
                const month_data = data[month]
                if(month_data){//閲覧中の月のシフト情報がfirestoreにある時の処理
                dispatch(fetchMonthDataAction(data[month])) 
                }  else{
                    dispatch(clearMonthDataAction())
                    } 
            } else {
                dispatch(clearMonthDataAction())
            }
            dispatch(hideLoadingAction());//ローディング画面描画終了
        })
        }
}

export const fetchEveryoneMonthData = (month)=>{

    const today = new Date() //現在の月を取得
    const preMonth = (today.getMonth() !== 0 )? today.getMonth() : 12 ; //先月の月を取得
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
        /*-----------------------閲覧中の月のスタッフ全員のシフト情報を取得する-----------------------*/
        db.collection('shift').get()
        .then((snapshot)=>{
            snapshot.forEach((snapshot)=>{
                const name = snapshot.id
                const data = snapshot.data()[month]                
                const preMonthData = snapshot.data()[preMonth]
                if(data){//閲覧中の月のシフト情報がある時の処理
                const data_length = Object.keys(data).length
                for(let i = 1; i <= data_length;i++){//シフト情報を日付ごとにobjectに書き込む
                    if(Object.keys(data[i]).length){
                        const obj ={}
                        obj[name] = data[i]
                        object[i].list[name] = obj
                        object[i]['length'] = object[i]['length']+1
                    }
                } 
            }
            if(preMonthData){//先月の情報をfirestoreから削除する
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
        /*-----------------------monthの初期化-----------------------*/
    return (dispatch)=>{
        dispatch(initializeMonthDataAction())
    }
}