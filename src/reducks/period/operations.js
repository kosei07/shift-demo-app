import { db } from '../../firebase/index'
import { fetchSubmissoinPeriodAction } from './actions'
import { setSubmissoinPeriodAction } from './actions'
import { setMessage } from '../message/operations'
import { fetchMember } from '../member/operations'
export const setSubmissoinPeriod = (beginMonth,beginDate,endMonth,endDate) => {
    return async (dispatch,getState) => {

        dispatch(fetchMember()).then(()=>{
            if(!(beginMonth && endMonth)){
                dispatch(setMessage('error',<p>ミス</p>))
                return
            }
            const begin = beginMonth+"/"+ beginDate
            const end = endMonth+"/"+endDate
            const data ={
                begin: begin,
                end: end
            }
            getState().member.list.map(snapshot=>{
                db.collection('users')
                .doc(snapshot.id)
                .set({isSubmitted:false},{ merge: true })
                return snapshot.id
            })
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
    return async (dispatch)=>{
        db.collection('submission')
        .doc('period')
        .get()
        .then((snapshot)=>{
            dispatch(fetchSubmissoinPeriodAction(snapshot.data()))
        })
    }
}
