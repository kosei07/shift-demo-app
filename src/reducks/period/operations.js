import { db } from '../../firebase/index'
import { fetchSubmissoinPeriodAction } from './actions'
import { setSubmissoinPeriodAction } from './actions'
import { setMessage } from '../message/operations'
import { fetchMember } from '../member/operations'
export const setSubmissoinPeriod = (beginMonth,beginDate,endMonth,endDate) => {
    return async (dispatch,getState) => {

        dispatch(fetchMember()).then(()=>{//スタッフ全員の情報を取得
            if(!(beginMonth && endMonth)){//提出期間の開始と終了の日付が選択されていない時の処理
                dispatch(setMessage('error',<p>ミス</p>))
                return
            }
         /*---------------提出期間をオブジェクトにまとめる---------------*/
            const begin = beginMonth+"/"+ beginDate
            const end = endMonth+"/"+endDate
            const data ={
                begin: begin,
                end: end
            }
         /*---------------スタッフの現在の提出状況を未提出にする---------------*/
            getState().member.list.map(snapshot=>{
                db.collection('users')
                .doc(snapshot.id)
                .set({isSubmitted:false},{ merge: true })
                return snapshot.id
            })
        /*---------------提出可能期間をperiodにセットする---------------*/
            db.collection('submission')
            .doc('period')
            .set(data)
            .then(()=>{
                dispatch(setSubmissoinPeriodAction(data))
                dispatch(setMessage('comment',<p>提出期間を設定しました</p>))
            })    

        })
    }
}

export const fetchSubmissionPeriod =()=>{
         /*---------------提出可能期間を取得---------------*/
    return async (dispatch)=>{
        db.collection('submission')
        .doc('period')
        .get()
        .then((snapshot)=>{
            dispatch(fetchSubmissoinPeriodAction(snapshot.data()))
        })
    }
}
