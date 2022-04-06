import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { PrimaryButton } from "../components/UIkit/index";
import { setSubmissoinPeriod } from "../reducks/period/operations";
import { getPeriod } from "../reducks/period/selectors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const useStyles = makeStyles(() =>
    createStyles({
        cardcontent: {
            width: "80%",
            margin: "auto"
        }
    }))


const Submissionperiod = (props) => {

    const classes = useStyles()

    const selector = useSelector(state => state)
    const period = getPeriod(selector)


    const dispatch = useDispatch()
    const date_array = []
    const [submissionPeriodBeginId, setsubmissionPeriodBeginId] = useState(false)
    const [submissionPeriodBeginDate, setsubmissionPeriodBeginDate] = useState(false)
    const [submissionPeriodEndDate, setsubmissionPeriodEndDate] = useState(false)
    const [submissionPeriodBeginMonth, setsubmissionPeriodBeginMonth] = useState(false)
    const [submissionPeriodEndMonth, setsubmissionPeriodEndMonth] = useState(false)

    /*ーーーーーカレンダーーーーーーーー*/
    const today = new Date()
    const [year, setYear] = useState(today.getFullYear())
    let [month, moveMonth] = useState(today.getMonth() + 1)
    const month_length = new Date(year, month, 0).getDate();
    const [isThisMonth, setIsThisMonth] = useState(true)

    const moveNextMonth = () => {
        month++
        if (month > 12) {
            month = 1
            setYear(year + 1)
            moveMonth(month)
        } else {
            moveMonth(month)
        }
        setIsThisMonth(false)
    }

    const moveThisMonth = () => {
        month--
        if (month < 1) {
            month = 12
            setYear(year - 1)
            moveMonth(12)
        } else {
            moveMonth(month)
        }
        setIsThisMonth(true)
    }



    /*ーーーーー先月末の日付ーーーーーーー*/

    const n = new Date(year, month - 1, 1).getDay();


    for (let i = 0; i < n; i++) {
        date_array.unshift(<div></div>)
    }

    /*ーーーーー今月の日付ーーーーーーー*/



    const onClick = (e) => {
        if (!submissionPeriodBeginDate) {
            setsubmissionPeriodBeginId(e.target.id)
            setsubmissionPeriodBeginDate(e.target.textContent)
            setsubmissionPeriodBeginMonth(month)
        } else {
            if (submissionPeriodEndDate) {
                setsubmissionPeriodBeginId(e.target.id)
                setsubmissionPeriodBeginDate(e.target.textContent)
                setsubmissionPeriodBeginMonth(month)
                setsubmissionPeriodEndDate(false)
                setsubmissionPeriodEndMonth(false)
            } else {
                if ((e.target.id - submissionPeriodBeginId) > 0) {
                    setsubmissionPeriodEndDate(e.target.textContent)
                    setsubmissionPeriodEndMonth(month)
                } else {
                    setsubmissionPeriodEndDate(submissionPeriodBeginDate)
                    setsubmissionPeriodEndMonth(submissionPeriodBeginMonth)
                    setsubmissionPeriodBeginDate(e.target.textContent)
                    setsubmissionPeriodBeginMonth(month)
                }
            }
        }
    }


    for (let i = 1; i <= month_length; i++) {
        if (submissionPeriodBeginMonth === submissionPeriodEndMonth) {
            if (month === submissionPeriodBeginMonth) {
                if ((submissionPeriodBeginDate < i && i <= submissionPeriodEndDate) || (submissionPeriodBeginDate === i)) {
                    date_array.push(
                        <ShiftperiodDatebox
                            date={i}
                            month={month}
                            year={year}
                            onClick={onClick}
                            withinRange={true}
                        />)
                } else {
                    date_array.push(
                        <ShiftperiodDatebox
                            date={i}
                            month={month}
                            year={year}
                            onClick={onClick}
                            withinRange={false}
                        />)
                }
            } else {
                date_array.push(
                    <ShiftperiodDatebox
                        date={i}
                        month={month}
                        year={year}
                        onClick={onClick}
                        withinRange={false}
                    />)

            }
        } else {
            if (submissionPeriodEndMonth !== false) {
                if (month === submissionPeriodBeginMonth) {
                    if (submissionPeriodBeginDate <= i) {
                        date_array.push(
                            <ShiftperiodDatebox
                                date={i}
                                month={month}
                                year={year}
                                onClick={onClick}
                                withinRange={true}
                            />)
                    } else {
                        date_array.push(
                            <ShiftperiodDatebox
                                date={i}
                                month={month}
                                year={year}
                                onClick={onClick}
                                withinRange={false}
                            />)
                    }
                } else {
                    if (submissionPeriodEndDate >= i) {
                        date_array.push(
                            <ShiftperiodDatebox
                                date={i}
                                month={month}
                                year={year}
                                onClick={onClick}
                                withinRange={true}
                            />)
                    } else {
                        date_array.push(
                            <ShiftperiodDatebox
                                date={i}
                                month={month}
                                year={year}
                                onClick={onClick}
                                withinRange={false}
                            />)
                    }
                }
            } else {
                if (month === submissionPeriodBeginMonth) {
                    if (i === submissionPeriodBeginDate) {
                        date_array.push(
                            <ShiftperiodDatebox
                                date={i}
                                month={month}
                                year={year}
                                onClick={onClick}
                                withinRange={true}
                            />)
                    } else {
                        date_array.push(
                            <ShiftperiodDatebox
                                date={i}
                                month={month}
                                year={year}
                                onClick={onClick}
                                withinRange={false}
                            />)
                    }
                } else {
                    date_array.push(
                        <ShiftperiodDatebox
                            date={i}
                            month={month}
                            year={year}
                            onClick={onClick}
                            withinRange={false}
                        />)
                }
            }
        }
    }
    /*ーーーーー来月頭の日付ーーーーーーー*/

    const lastDay = new Date(year, month, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
        date_array.push(<div></div>)
    }

    /*ーーーーー日付を一週間ずつに分けるーーーーーーー*/


    const weeks = [];
    const weeksCount = date_array.length / 7;

    for (let i = 0; i < weeksCount; i++) {
        weeks.push(date_array.splice(0, 7))
    }

    const onClickOk = () => {
        dispatch(setSubmissoinPeriod(submissionPeriodBeginMonth, submissionPeriodBeginDate, submissionPeriodEndMonth, submissionPeriodEndDate))
        setsubmissionPeriodBeginId(false)
        setsubmissionPeriodBeginDate(false)
        setsubmissionPeriodEndDate(false)
        setsubmissionPeriodBeginMonth(false)
        setsubmissionPeriodEndMonth(false)
    }

    const onClickClear = () => {
        setsubmissionPeriodBeginId(false)
        setsubmissionPeriodBeginDate(false)
        setsubmissionPeriodEndDate(false)
        setsubmissionPeriodBeginMonth(false)
        setsubmissionPeriodEndMonth(false)
    }

    return (
        <div>
            <div className="spacer_s"></div>
            <Card className={classes.cardcontent}>
                <CardContent>
                    <table className="shiftperiod_table">
                        <tbody>
                            <tr>
                                <td>現在の提出期間</td>
                                <td>:</td>
                                <td>
                                    <div className="shiftperiod_wrap">
                                        <p className="margin_padding_0">{period.begin}</p>
                                        <p className="margin_padding_0">〜</p>
                                        <p className="margin_padding_0">{period.end}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>選択期間</td>
                                <td>:</td>
                                <td>
                                    {submissionPeriodBeginMonth ?
                                        <div className="shiftperiod_wrap shiftperiod_border">
                                            <p className="margin_padding_0">{submissionPeriodBeginMonth}/{submissionPeriodBeginDate}</p>
                                            <p className="margin_padding_0">〜</p>
                                            {submissionPeriodEndMonth &&
                                                <p className="margin_padding_0">{submissionPeriodEndMonth}/{submissionPeriodEndDate}</p>
                                            }
                                        </div>
                                        :
                                        <p className="margin_padding_0">未選択</p>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
            <div className="spacer_m"></div>
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
                                            <td key={date_key} className="datebox margin_padding_0 border">
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
            <div className="spacer_s"></div>
            <div className="multiple_buttons_wrap">
                <PrimaryButton
                    label={"クリア"}
                    color="primary"
                    disabled={false}
                    onClick={onClickClear}>
                </PrimaryButton>
                <PrimaryButton
                    label={"決定する"}
                    color="secondary"
                    disabled={!submissionPeriodEndMonth}
                    onClick={onClickOk}>
                </PrimaryButton>
            </div>
        </div>
    )
}

export default Submissionperiod

const ShiftperiodDatebox = (props) => {

    let date = props.date
    let month = props.month

    if (date < 10) {
        date = "0" + date
    }
    if (month < 10) {
        month = "0" + month
    }

    const within_style = {
        backgroundColor: "rgba(255, 160, 122, 0.3)"
    }

    const out_style = {
        backgroundColor: "#fff"
    }
    return (
        <p className="m-fontsize shiftperiod_datebox"
            onClick={props.onClick}
            id={`${props.year}${month}${date}`}
            style={(props.withinRange) ? within_style : out_style}
        >
            {props.date}
        </p>
    )
}

