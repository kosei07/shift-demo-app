import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PrimaryButton } from "../components/UIkit/index";
import { setSubmissoinPeriod } from "../reducks/period/operations";
import { getPeriod } from "../reducks/period/selectors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles(() =>
  createStyles({
    cardcontent: {
      width: "80%",
      margin: "auto",
    },
  })
);

const Submissionperiod = () => {
  const classes = useStyles();

  const selector = useSelector((state) => state);
  const period = getPeriod(selector);

  const dispatch = useDispatch();
  const date_array = [];

  const [submissionPeriodBeginId, setsubmissionPeriodBeginId] = useState(false);
  const [submissionPeriodBeginDate, setsubmissionPeriodBeginDate] =
    useState(false);
  const [submissionPeriodEndDate, setsubmissionPeriodEndDate] = useState(false);
  const [submissionPeriodBeginMonth, setsubmissionPeriodBeginMonth] =
    useState(false);
  const [submissionPeriodEndMonth, setsubmissionPeriodEndMonth] =
    useState(false);

  /*ーーーーーカレンダーーーーーーーー*/
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  let [month, moveMonth] = useState(today.getMonth() + 1);
  const month_length = new Date(year, month, 0).getDate();
  const [isThisMonth, setIsThisMonth] = useState(true);

  const moveNextMonth = () => {
    //次月に移動
    month++;
    if (month > 12) {
      //次月が一月の時の処理
      month = 1;
      setYear(year + 1);
      moveMonth(month);
    } else {
      moveMonth(month);
    }
    setIsThisMonth(false);
  };

  const moveThisMonth = () => {
    //今月に移動
    month--;
    if (month < 1) {
      //今月が12月の時の処理
      month = 12;
      setYear(year - 1);
      moveMonth(12);
    } else {
      moveMonth(month);
    }
    setIsThisMonth(true);
  };

  const onClick = (e) => {
    //日付を選択した時の処理
    if (!submissionPeriodBeginDate) {
      //期間の開始が設定されてない時
      setsubmissionPeriodBeginId(e.target.id);
      setsubmissionPeriodBeginDate(e.target.textContent);
      setsubmissionPeriodBeginMonth(month);
    } else {
      if (submissionPeriodEndDate) {
        //すでに選択されている期間がある時の処理
        setsubmissionPeriodBeginId(e.target.id);
        setsubmissionPeriodBeginDate(e.target.textContent);
        setsubmissionPeriodBeginMonth(month);
        setsubmissionPeriodEndDate(false);
        setsubmissionPeriodEndMonth(false);
      } else {
        if (e.target.id - submissionPeriodBeginId > 0) {
          //期間が終了、開始の順で選択された時の処理
          setsubmissionPeriodEndDate(e.target.textContent);
          setsubmissionPeriodEndMonth(month);
        } else {
          //期間が開始、終了の順で選択された時の処理（通常時）
          setsubmissionPeriodEndDate(submissionPeriodBeginDate);
          setsubmissionPeriodEndMonth(submissionPeriodBeginMonth);
          setsubmissionPeriodBeginDate(e.target.textContent);
          setsubmissionPeriodBeginMonth(month);
        }
      }
    }
  };

  /*ーーーーー先月末の日付ーーーーーーー*/

  const n = new Date(year, month - 1, 1).getDay(); //閲覧中の月の前月の最終日の曜日を取得

  for (let i = 0; i < n; i++) {
    date_array.unshift(<div></div>);
  }

  /*ーーーーー今月の日付ーーーーーーー*/

  for (let i = 1; i <= month_length; i++) {
    let withinRange_flag = false;
    if (submissionPeriodBeginMonth === submissionPeriodEndMonth) {
      //選択した期間の開始と終了の日付が同じ月の時の処理
      if (
        month === submissionPeriodBeginMonth &&
        ((submissionPeriodBeginDate <= i && i <= submissionPeriodEndDate) ||
          submissionPeriodBeginDate === i)
      ) {
        withinRange_flag = true;
      }
    } else {
      if (submissionPeriodEndMonth !== false) {
        if (
          (month === submissionPeriodBeginMonth &&
            submissionPeriodBeginDate <= i) ||
          (month !== submissionPeriodBeginMonth && submissionPeriodEndDate >= i)
        ) {
          withinRange_flag = true;
        }
      } else {
        if (
          month === submissionPeriodBeginMonth &&
          i === submissionPeriodBeginDate
        ) {
          withinRange_flag = true;
        }
      }
    }
    date_array.push(
      <ShiftperiodDatebox
        date={i}
        month={month}
        year={year}
        onClick={onClick}
        withinRange={withinRange_flag}
      />
    );
  }
  /*ーーーーー来月頭の日付ーーーーーーー*/

  const lastDay = new Date(year, month, 0).getDay(); //閲覧中の月の最終日の曜日を取得

  for (let i = 1; i < 7 - lastDay; i++) {
    date_array.push(<div></div>);
  }

  /*ーーーーー日付を一週間ずつに分けるーーーーーーー*/

  const weeks = [];
  const weeksCount = date_array.length / 7; //カレンダーが何週分にわたるかを計算

  for (let i = 0; i < weeksCount; i++) {
    //日付の配列を一週間ごとに区切って配列にまとめる
    weeks.push(date_array.splice(0, 7));
  }

  const onClickOk = () => {
    //決定するを押した時の処理
    dispatch(
      setSubmissoinPeriod(
        submissionPeriodBeginMonth,
        submissionPeriodBeginDate,
        submissionPeriodEndMonth,
        submissionPeriodEndDate
      )
    );
    setsubmissionPeriodBeginId(false);
    setsubmissionPeriodBeginDate(false);
    setsubmissionPeriodEndDate(false);
    setsubmissionPeriodBeginMonth(false);
    setsubmissionPeriodEndMonth(false);
  };

  const onClickClear = () => {
    //クリアを押した時の処理
    setsubmissionPeriodBeginId(false);
    setsubmissionPeriodBeginDate(false);
    setsubmissionPeriodEndDate(false);
    setsubmissionPeriodBeginMonth(false);
    setsubmissionPeriodEndMonth(false);
  };

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
                  {submissionPeriodBeginMonth ? (
                    <div className="shiftperiod_wrap shiftperiod_border">
                      <p className="margin_padding_0">
                        {submissionPeriodBeginMonth}/{submissionPeriodBeginDate}
                      </p>
                      <p className="margin_padding_0">〜</p>
                      {submissionPeriodEndMonth && (
                        <p className="margin_padding_0">
                          {submissionPeriodEndMonth}/{submissionPeriodEndDate}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="margin_padding_0">未選択</p>
                  )}
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
            {!isThisMonth && <ArrowBackIosIcon onClick={moveThisMonth} />}
          </div>
          <h3 className="margin_padding_0">{month}月</h3>
          <div className="calender_top_icon">
            {isThisMonth && <ArrowForwardIosIcon onClick={moveNextMonth} />}
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
            {weeks.map((week, week_key) => (
              <tr key={week_key}>
                {week.map((date, date_key) => (
                  <td
                    key={date_key}
                    className="datebox margin_padding_0 border"
                  >
                    {date}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="spacer_s"></div>
      <div className="multiple_buttons_wrap">
        <PrimaryButton
          label={"クリア"}
          color="primary"
          disabled={false}
          onClick={onClickClear}
        ></PrimaryButton>
        <PrimaryButton
          label={"決定する"}
          color="secondary"
          disabled={!submissionPeriodEndMonth}
          onClick={onClickOk}
        ></PrimaryButton>
      </div>
    </div>
  );
};

export default Submissionperiod;

const ShiftperiodDatebox = (props) => {
  /*----------------選択されている期間内に背景色をつける------------------*/
  let date = props.date;
  let month = props.month;

  if (date < 10) {
    //deteを二桁の文字列に変更
    date = "0" + date;
  }
  if (month < 10) {
    //monthを二桁の文字列に変更
    month = "0" + month;
  }

  const within_style = {
    //選択されている期間内の背景色
    backgroundColor: "rgba(255, 160, 122, 0.3)",
  };

  const out_style = {
    //選択されている期間外の背景色
    backgroundColor: "#fff",
  };
  return (
    <p
      className="m-fontsize shiftperiod_datebox"
      onClick={props.onClick}
      id={`${props.year}${month}${date}`}
      style={props.withinRange ? within_style : out_style}
    >
      {props.date}
    </p>
  );
};
