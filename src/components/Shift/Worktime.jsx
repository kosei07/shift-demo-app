import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { clearWorktime, setWorktime } from '../../reducks/shift/operations'
import {TextInput, PrimaryButton} from "../UIkit/index";
import {Selectbox} from "./index";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import Divider from '@material-ui/core/Divider';
import { setMessage } from "../../reducks/message/operations";

export default function Worktime(props) {

    const dispatch = useDispatch()

    const [start, setStart] = useState("")
    const [finish, setFinish] = useState("")
    const [comment, setComment] = useState("")
    const [holidayCheckbox, setHolidayCheckBox] = useState(false)
    const [pressableOkButton, setPressableOkButton] = useState(false)
    const [pressableClearButton, setPressableClearButton] = useState(false)

    useEffect(() => {
        if (props.start) {
            if (props.start !== '希望休') {
                setStart(props.start)
                setFinish(props.finish)
            }else{
                setHolidayCheckBox(true)
            }
            setComment(props.comment)
            setPressableClearButton(true)
        }else{
            setStart("")
            setFinish("")
            setComment("")
            setPressableOkButton(false)
            setPressableClearButton(false)
            setHolidayCheckBox(false)
        }
    }, [props.start,props.finish,props.comment])
/*--------------------コメントが変更された時の処理---------------------*/
    const commentChange = (e) => {
        setComment(e.target.value)
        if(holidayCheckbox || start){
            setPressableOkButton(true)
            setPressableClearButton(false)
        }
    }
/*--------------------「閉じる」が押された時の処理---------------------*/
    const close = () => {
        if(props.start){
        setStart(start)
        setFinish(finish)
        setComment(comment)
        setHolidayCheckBox(holidayCheckbox)
        }else{
            setStart("")
            setFinish("")
            setComment("")
            setHolidayCheckBox(false)
            setPressableOkButton(false)
            setPressableClearButton(false)    
        }
        props.setShow(false)
    }
/*--------------------「ok」が押された時の処理---------------------*/

    const onOkClick =() => {
        if(start !== "" && finish !== ""){
            const splitStart = start.split(":")
            const splitFinish = finish.split(":")
            if( Number(splitFinish[0] + splitFinish[1]) - Number(splitStart[0] + splitStart[1]) <= 0 || splitStart[0] === "--" ||splitFinish[0] === "--"){
                dispatch(setMessage("error",<p>入力に誤りがあります</p>))
                return
            }
        }
        dispatch(setWorktime(props.date, start, finish, comment, holidayCheckbox))
        setPressableOkButton(false)
        setPressableClearButton(true)
        props.setNewSubmit(true)
        props.setUpdateSubmit(true)
        props.setShow(false)
    }
/*--------------------「削除」が押された時の処理---------------------*/

    const onClearClick = () => {
        dispatch(clearWorktime(props.date))
        setStart("")
        setFinish("")
        setComment("")
        props.setNewSubmit(true)
        props.setUpdateSubmit(true)
        props.setShow(false)
    }

/*--------------------「希望休」のチェックボックスが押された時の処理---------------------*/

    const handleChange = () => {
        setStart("")
        setFinish("")
        if(holidayCheckbox){
            setPressableOkButton(false)
        }else{
            setPressableOkButton(true)
            setPressableClearButton(false)
        }
        setHolidayCheckBox(!holidayCheckbox)
    }

    /*--------------JSX-------------*/
    if (props.show) {//日付が選択された時のみ開く
        return (
            <div className="overlay modal-center">
                <div className="content" onClick={(e) => e.stopPropagation()}>

                    <h1>{props.month}月{props.date}日</h1>
                    <p className="margin_padding_0">①②のどちらかを入力し「OK」を押してください</p>
                    <p className="margin_padding_0">また要望などあればコメントに追記してください</p>
                    <div className="spacer_m"></div>
                    <Divider />
                    <div className="spacer_s"></div>
                    <p className="margin_padding_0">①勤務時間を入力する方はこちら</p>
                    <div className="spacer_s"></div>
                    <div className="selectbox_wrap2">
                        <Selectbox
                            time={start}
                            anotherTime={finish}
                            setTime={setStart}
                            setPressableOkButton={setPressableOkButton}
                            setPressableClearButton={setPressableClearButton}
                            setHolidayCheckBox={setHolidayCheckBox}
                        />
                        <p>〜</p>
                        <Selectbox
                            time={finish}
                            anotherTime={start}
                            setTime={setFinish}
                            setPressableOkButton={setPressableOkButton}
                            setPressableClearButton={setPressableClearButton}
                            setHolidayCheckBox={setHolidayCheckBox}
                        />

                    </div>
                    <div className="spacer_s"></div>
                    <Divider />
                    <div className="spacer_s"></div>
                    <div>
                        <p className="margin_padding_0">②希望休を提出する方はこちら</p>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChange}
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        },
                                    }}
                                    checked={holidayCheckbox}
                                />
                            }
                            label="希望休"
                        />
                    </div>
                    <div className="spacer_s"></div>
                    <Divider />
                    <div className="textinput_container">
                        <TextInput
                            fullWidth={true} label={"※コメント"} multiline={false} required={true}
                            rows={1} value={comment} type={"text"} onChange={commentChange}
                            placeholder={"(例)　二時間休憩いただきたいです"}
                        />
                    </div>
                    <div className="spacer_s"></div>
                    <Divider />
                    <div className="spacer_m"></div>
                    <div className="multiple_buttons_wrap">
                        <PrimaryButton label={"閉じる"} color="default" onClick={close}></PrimaryButton>
                        {pressableClearButton ?
                            <PrimaryButton label={"削除"} color="primary" onClick={() => { onClearClick()}}></PrimaryButton>
                            :
                            <PrimaryButton label={"OK"} color="secondary" onClick={() => { onOkClick()}} disabled={!pressableOkButton}></PrimaryButton>
                        }
                    </div>
                    <div className="spacer_m"></div>
                </div>
            </div>

        )
    } else {
        return null;
    }
}