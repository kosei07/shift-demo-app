import React from "react";
import { useState, useEffect } from "react";
import { getMonth } from "../../reducks/shift/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Datebox } from "./index"
import { PrimaryButton } from "../UIkit/index";
import { submitMonthData } from "../../reducks/shift/operations"
import { setIsSubmitted } from "../../reducks/users/operations";
import { setMessage } from "../../reducks/message/operations";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Calender = (props) => {

    console.log('a')
    const name = props.name
    const [newSubmit, setNewSubmit] = useState(false)
    const selector = useSelector(state => state)
    const dispatch = useDispatch()
    const month_data = getMonth(selector)
    const date_array = []

    /*ーーーーーカレンダーーーーーーーー*/
    const today = new Date()
    const [year, setYear] = useState(today.getFullYear())
    let [month, moveMonth] = useState(today.getMonth() + 1)
    const month_length = new Date(year, month, 0).getDate();
    const [isThisMonth, setIsThisMonth] = useState(true)

    /*-------------初回レンダリング時の処理--------------*/
    const fetchFunction = props.fetchFunction
    useEffect(() => {
        fetchFunction(month.toString(), name)
    }, [month, name])

    const moveNextMonth = () => {
        if (!newSubmit) {
            month++
            if (month > 12) {
                month = 1
                setYear(year + 1)
                moveMonth(month)
            } else {
                moveMonth(month)
            }
            setIsThisMonth(false)
            props.fetchFunction(month.toString(), name)
        } else {
            dispatch(setMessage("error", <p>未提出の内容があります</p>))
        }
    }

    const moveThisMonth = () => {
        if (!newSubmit) {
            month--
            if (month < 1) {
                month = 12
                setYear(year - 1)
                moveMonth(12)
            } else {
                moveMonth(month)
            }
            setIsThisMonth(true)
            props.fetchFunction(month.toString(), name)
        } else {
            dispatch(setMessage("error", <p>未提出の内容があります</p>))
        }
    }

    /*ーーーーー選択可能期間ーーーーーーー*/

    const period = props.period

    const beginMonth = Number(period.begin.split('/')[0])
    const beginDate = Number(period.begin.split('/')[1])
    const endMonth = Number(period.end.split('/')[0])
    const endDate = Number(period.end.split('/')[1])

    /*ーーーーー先月末の日付ーーーーーーー*/

    const lastmonth_lastday = new Date(year, month - 1, 1).getDay();
    const lastmonth_lastdate = new Date(year, month - 1, 0).getDate();


    for (let i = 0; i < lastmonth_lastday; i++) {
        if (month - 1 === beginMonth) {
            if (i >= beginDate) {
                date_array.unshift(
                    <Datebox
                        month={false}
                        date={lastmonth_lastdate - i}
                        data={""}
                        isStaffpage={props.isStaffpage}
                        newSubmit={newSubmit}
                        setNewSubmit={setNewSubmit}
                        withinPeriod={true}
                    />)
            } else {
                date_array.unshift(
                    <Datebox
                        month={false}
                        date={lastmonth_lastdate - i}
                        data={""}
                        isStaffpage={props.isStaffpage}
                        newSubmit={newSubmit}
                        setNewSubmit={setNewSubmit}
                        withinPeriod={false}
                    />)
            }
        } else {
            date_array.unshift(
                <Datebox
                    month={false}
                    date={lastmonth_lastdate - i}
                    data={""}
                    isStaffpage={props.isStaffpage}
                    newSubmit={newSubmit}
                    setNewSubmit={setNewSubmit}
                    withinPeriod={false}
                />)
        }
    }

    /*ーーーーー今月の日付ーーーーーーー*/
    // const period = props.period

    // const beginMonth = Number(period.begin.split('/')[0])
    // const beginDate = Number(period.begin.split('/')[1])
    // const endMonth = Number(period.end.split('/')[0])
    // const endDate = Number(period.end.split('/')[1])

    for (let i = 1; i <= month_length; i++) {
        const data = month_data[`${i}`]
        if (beginMonth === endMonth) {
            if (month === beginMonth) {
                if (beginDate <= i && i <= endDate) {
                    date_array.push(
                        <Datebox
                            month={month}
                            date={i}
                            data={data}
                            isStaffpage={props.isStaffpage}
                            newSubmit={newSubmit}
                            setNewSubmit={setNewSubmit}
                            withinPeriod={true}
                        />)
                } else {
                    date_array.push(
                        <Datebox
                            month={month}
                            date={i}
                            data={data}
                            isStaffpage={props.isStaffpage}
                            newSubmit={newSubmit}
                            setNewSubmit={setNewSubmit}
                            withinPeriod={false}
                        />)
                }
            } else {
                date_array.push(
                    <Datebox
                        month={month}
                        date={i}
                        data={data}
                        isStaffpage={props.isStaffpage}
                        newSubmit={newSubmit}
                        setNewSubmit={setNewSubmit}
                        withinPeriod={false}
                    />)
            }
        } else {
            if (month === beginMonth) {
                if (beginDate <= i) {
                    date_array.push(
                        <Datebox
                            month={month}
                            date={i}
                            data={data}
                            isStaffpage={props.isStaffpage}
                            newSubmit={newSubmit}
                            setNewSubmit={setNewSubmit}
                            withinPeriod={true}
                        />)
                } else {
                    date_array.push(
                        <Datebox
                            month={month}
                            date={i}
                            data={data}
                            isStaffpage={props.isStaffpage}
                            newSubmit={newSubmit}
                            setNewSubmit={setNewSubmit}
                            withinPeriod={false}
                        />)
                }
            } else {
                if (endDate >= i) {
                    date_array.push(
                        <Datebox
                            month={month}
                            date={i}
                            data={data}
                            isStaffpage={props.isStaffpage}
                            newSubmit={newSubmit}
                            setNewSubmit={setNewSubmit}
                            withinPeriod={true}
                        />)
                } else {
                    date_array.push(
                        <Datebox
                            month={month}
                            date={i}
                            data={data}
                            isStaffpage={props.isStaffpage}
                            newSubmit={newSubmit}
                            setNewSubmit={setNewSubmit}
                            withinPeriod={false}
                        />)
                }
            }
        }
    }

    /*ーーーーー来月頭の日付ーーーーーーー*/

    const nextmonth_lastday = new Date(year, month, 0).getDay();

    for (let i = 1; i < 7 - nextmonth_lastday; i++) {
        if (month + 1 === endMonth) {
            if (i <= endDate) {
                date_array.push(
                    <Datebox
                        month={false}
                        date={i}
                        data={""}
                        isStaffpage={props.isStaffpage}
                        newSubmit={newSubmit}
                        setNewSubmit={setNewSubmit}
                        withinPeriod={true}
                    />)
            } else {
                date_array.push(
                    <Datebox
                        month={false}
                        date={i}
                        data={""}
                        isStaffpage={props.isStaffpage}
                        newSubmit={newSubmit}
                        setNewSubmit={setNewSubmit}
                        withinPeriod={false}
                    />)
            }
        } else {
            date_array.push(
                <Datebox
                    month={false}
                    date={i}
                    data={""}
                    isStaffpage={props.isStaffpage}
                    newSubmit={newSubmit}
                    setNewSubmit={setNewSubmit}
                    withinPeriod={false}
                />)
        }
    }

    /*ーーーーー日付を一週間ずつに分けるーーーーーーー*/


    const weeks = [];
    const weeksCount = date_array.length / 7;

    for (let i = 0; i < weeksCount; i++) {
        weeks.push(date_array.splice(0, 7))
    }

    return (
        <div>
            <div className="spacer_s"></div>
            <div className="margin_padding_0 calender_top">
                <div className="spacer_ss"></div>
                <div className="calender_top_wrap">
                    <div className="calender_top_icon">
                        {!isThisMonth &&
                            <ArrowBackIosIcon onClick={moveThisMonth}/>
                        }
                    </div>
                    <h3 className="margin_padding_0">{month}月</h3>
                    <div className="calender_top_icon">
                        {isThisMonth &&
                           <ArrowForwardIosIcon onClick={moveNextMonth}/>
                        }
                    </div>
                </div>
            </div>
            <div className="wrap">
                <table className="calender_table">
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            weeks.map((week, week_key) => (
                                <tr key={week_key}>
                                    {
                                        week.map((date, date_key) => (
                                            <td key={date_key} className="datebox margin_padding_0">
                                                {date}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="space_l"></div>
            {props.isStaffpage ?
                <div className="button_wrap">
                    <div className="spacer_m"></div>
                    <PrimaryButton
                        label="提出する"
                        color="secondary"
                        disabled={!(newSubmit || !props.isSubmitted)}
                        onClick={() => {
                            dispatch(submitMonthData(name, month.toString(), month_data));
                            setNewSubmit(false);
                            if (!props.isSubmitted) {
                                dispatch(setIsSubmitted(props.id))
                            }
                        }
                        }
                    >
                    </PrimaryButton>
                </div>
                :
                <></>
            }

        </div>
    )
}

export default Calender