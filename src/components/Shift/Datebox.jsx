import React from "react";
import { Worktime, Shiftcheck } from "./index";
import { useState, useEffect } from "react";
import { setMessage } from "../../reducks/message/operations";
import { useDispatch } from "react-redux";

/*-------------------それぞれの日付のスタイル-------------------*/
const updateSubmitStyle = {
    borderRadius: 2,
    backgroundColor: "rgba(255, 160, 122, 0.3)",
    color: 'black'
}
const defaultStyle = {
    color: 'black'
}
const outOfPeriodStyle = {
    pointerEvents: "none",
    backgroundColor: "rgba(128, 128, 128, 0.4)",
    color: 'black'
}
const anotherMonth_outofPeriodStyle = {
    pointerEvents: "none",
    color: ' rgba(35, 35, 35, 0.2)',
    backgroundColor: "rgba(128, 128, 128, 0.4)",
}
const anotherMonthStyle = {
    pointerEvents: "none",
    color: ' rgba(35, 35, 35, 0.2)',
}


export const Datebox = (props) => {
    /*--------------日付の情報の取得--------------*/
    const date = props.date
    const data = props.data
    const isStaffpage = props.isStaffpage
    const month = props.month
    const isThisMonth = props.isThisMonth

    const [style, setStyle] = useState(defaultStyle)//それぞれの日付のスタイルを設定する
    const [updateSubmit, setUpdateSubmit] = useState(false)//シフトの情報変更の有無

    const [show, setShow] = useState(false)

    const open = () => {//shiftcheckもしくはworktimeを開く
        setShow(true)
    }

    useEffect(() => {
        if (isStaffpage && !props.withinPeriod) { //スタッフ用のページかつ提出可能期間外の処理
            setStyle(outOfPeriodStyle)
            if (!isThisMonth) { //スタッフ用のページかつ提出可能期間外またカレンダー前後の閲覧中ではない日付の処理
                setStyle(anotherMonth_outofPeriodStyle)
            }
        } else {
            if (props.newSubmit && updateSubmit) {//シフトの情報が変更された時の処理
                setStyle(updateSubmitStyle)
            } else {//管理者用のページまたはスタッフ用のページの提出可能期間内の処理
                setStyle(defaultStyle)
                setUpdateSubmit(false)
                if (!isThisMonth) {//スタッフ用のページのカレンダー前後の閲覧中ではない日付の処理
                    setStyle(anotherMonthStyle)
                }
            }
        }
    }, [month,updateSubmit, props.newSubmit, props.withinPeriod, isStaffpage,isThisMonth])


    return (
        <div className="datebox_wrap" style={style} onClick={open}>
            <div><p className="datebox_date" >{date}</p></div>
            {isStaffpage ?
                <StaffRenderComponent
                    month={month}
                    date={date}
                    data={data}
                    show={show}
                    setShow={setShow}
                    setUpdateSubmit={setUpdateSubmit}
                    setNewSubmit={props.setNewSubmit}
                    setStyle={setStyle}
                    withinPeriod={props.withinPeriod}
                />
                :
                <div>
                    <ManagerRenderComponent
                        month={month}
                        date={date}
                        data={data}
                        show={show}
                        setShow={setShow}
                    />
                </div>
            }
        </div>
    )
}


export default Datebox

export const StaffRenderComponent = (props) => {
    /*--------------日付の情報の取得--------------*/

    const data = props.data
    const start = data.start
    const finish = data.finish
    const comment = data.comment
    return (
        <div className="margin_padding_0">
            <Worktime
                show={props.show}
                setShow={props.setShow}
                date={props.date}
                month={props.month}
                start={start}
                finish={finish}
                comment={comment}
                setUpdateSubmit={props.setUpdateSubmit}
                setNewSubmit={props.setNewSubmit}
            />
            <div><p className="s-fontsize text_center">{start}</p></div>
            <div><p className="s-fontsize text_center">{finish}</p></div>
        </div>
    )

}

export const ManagerRenderComponent = (props) => {
    const data = props.data
    const list = data.list
    const length = data.length
    const ary = []
    const dispatch = useDispatch()
    let color = 'lightgray'

    const holidaystyle = {//希望休の時の文字のスタイル
        color: "blue"
    }

    const defaultstyle = {//希望休以外の時の文字のスタイル
        color: "#000"
    }

    for (const key in list) {//提出されたその日のシフト情報を配列にpush
        for (const name in list[key]) {
            ary.push(
                <tr key={key}>
                    <td>{key}</td>
                    <td style={(list[key][name].start === "希望休") ? holidaystyle : defaultstyle}>{list[key][name].start}</td>
                    <td>{list[key][name].finish}</td>
                    <td>{(list[key][name].comment !== "") && <button className="lookcommentbutton"
                        onClick={() => dispatch(setMessage("comment", <div><p>{name}さん</p><p>{list[key][name].comment}</p></div>))} type="button">詳細</button>}</td>
                </tr>
            )
        }
    }

    /*------------------日付ごとのシフトに入れる人数によって表示される円の色を変える-------------------*/
    if (length === 1 || length === 2) {
        color = 'khaki'
    } else if (length === 3 || length === 4) {
        color = 'orange'
    } else if (length === 5 || length === 6) {
        color = 'tomato'
    } else if (length >= 7) {
        color = 'red'
    }

    return (
        <div>
            <Shiftcheck
                data={data}
                show={props.show}
                setShow={props.setShow}
                date={props.date}
                month={props.month}
                ary={ary}
            />
            {props.month ?
                <p className="datebox_manager_component_radius" style={{ backgroundColor: color }}></p>
                :
                <></>
            }
        </div>)
}
