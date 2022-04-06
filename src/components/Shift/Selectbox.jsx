import React, { useState,useEffect,useRef} from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Selectoptionbox(props) {

  if (props.show) {

    const onClickHour = (e) => {//時間を選択した時の処理
      props.setHour(e.target.textContent)
      if (props.minute === "--") {//stateの値が空の時
        props.setMinute("00")
        props.setTime(e.target.textContent + ":00")
      } else {
        props.setTime(e.target.textContent + ":" + props.minute)
      }
      props.setPressableClearButton(false)
      props.setHolidayCheckBox(false)
      if (props.anotherTime) {//開始時刻か終了時刻のどちらか選択していない方がまだ選択されていない時の処理
        props.setPressableOkButton(true)
      }else{
        props.setPressableOkButton(false)
      }
    }


    const onClickMinute = (e) => {//分を選択した時の処理
      props.setMinute(e.target.textContent)
      props.setTime(props.hour + ":" + e.target.textContent)
      props.setPressableClearButton(false)
      props.setHolidayCheckBox(false)
      if (props.anotherTime) {//開始時刻か終了時刻のどちらか選択していない方がまだ選択されていない時の処理
        props.setPressableOkButton(true)
      }
    }

    /*-----------選択できるオプション----------*/
    const hourOption = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",]
    const minuteOption = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]

    return (
      <div className="selectoptionbox">
        <div className="selectoption_wrap">
          <div className="selectoption">
            <ul>
              {
                hourOption.map(option => {
                  return (<li value={option} key={option} onClick={onClickHour}>{option}</li>)
                })
              }
            </ul>
            <ul>
              {
                minuteOption.map(option => {
                  return (<li value={option} key={option} onClick={onClickMinute}>{option}</li>)
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}


export default function Selectbox(props) {

  const [show, setShow] = useState(false)
  const [hour, setHour] = useState("--")
  const [minute, setMinute] = useState("--")


  useEffect(() => {
    const time = props.time
    if (time) {//stateに値が入っているときの処理
      setHour(time.split(':')[0])
      setMinute(time.split(':')[1])
    } else {
      setHour("--")
      setMinute("--")
    }
  }, [props.time])


  const open = () => {//Selectoptionboxを開く
    setShow(true)
  }

  /*-----------------コンポーネントの外をクリックするSelectoptionboxが閉じる-----------------*/ 
  const componentRef = useRef();
  
  const handleClickOutside = (e) => {
    if (!componentRef.current.contains(e.target)) {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="selectbox_wrap" ref={componentRef} >
      <div className="selectbox_content" onClick={open}>
        <div className="wrap">
          <p className="margin_padding_0">{hour}:{minute}</p>
          <AccessTimeIcon/>
        </div>
      </div>
      <Selectoptionbox
        show={show}
        setShow={setShow}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
        setTime={props.setTime}
        anotherTime={props.anotherTime}
        setPressableOkButton={props.setPressableOkButton}
        setPressableClearButton={props.setPressableClearButton}
        setHolidayCheckBox={props.setHolidayCheckBox}
      />
    </div>
  )
}