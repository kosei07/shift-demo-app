import React from "react";
import { Worktime, Shiftcheck } from "./index";
import { useState, useEffect } from "react";
import { setMessage } from "../../reducks/message/operations";
import { useDispatch } from "react-redux";

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
    /*ーーーーーーーーーモーダルウィンドウーーーーーーー*/

    const date = props.date
    const data = props.data
    const isStaffpage = props.isStaffpage
    const month = props.month
    const [style, setStyle] = useState(defaultStyle)
    const [updateSubmit, setUpdateSubmit] = useState(false)
    const [show, setShow] = useState(false)
    const open = () => {
        setShow(true)
    }

    useEffect(() => {
        if (isStaffpage && !props.withinPeriod) {
            setStyle(outOfPeriodStyle)
            if (!month) {
                setStyle(anotherMonth_outofPeriodStyle)
            }
        } else {
            if (props.newSubmit && updateSubmit) {
                setStyle(updateSubmitStyle)
            } else {
                setStyle(defaultStyle)
                setUpdateSubmit(false)
                if (!month) {
                    setStyle(anotherMonthStyle)
                }
            }
        }
    }, [month,updateSubmit, props.newSubmit, props.withinPeriod, isStaffpage])


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

    const holidaystyle = {
        color: "blue"
    }

    const defaultstyle = {
        color: "#000"
    }

    for (const key in list) {
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
