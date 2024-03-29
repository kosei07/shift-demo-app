import React from "react";
import { useState, useEffect } from "react";
import { getMonth } from "../../../reducks/shift/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Datebox } from "./index";
import { PrimaryButton } from "../../../UIkit/index";
import { submitMonthData } from "../../../reducks/shift/operations";
import { setIsSubmitted } from "../../../reducks/users/operations";
import { setMessage } from "../../../reducks/message/operations";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Calender = (props) => {
  const name = props.name;
  const [newSubmit, setNewSubmit] = useState(false);

  const date_array = []; //カレンダーの日付の情報を順に格納する

  /*ーーーーーシフトのデータを取得ーーーーーーー*/
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const month_data = getMonth(selector);

  /*ーーーーー現在の日付の情報を取得ーーーーーーー*/
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  let [month, moveMonth] = useState(today.getMonth() + 1);
  const month_length = new Date(year, month, 0).getDate();
  const [afterMonthCount,setAfterMonthCount] = useState(0) // 今月から何ヶ月後か


  /*ーーーーースタッフのシフト提出可能期を取得ーーーーーーー*/

  const period = props.period;

  const beginMonth = Number(period.begin.split("/")[0]);
  const beginDate = Number(period.begin.split("/")[1]);
  const endMonth = Number(period.end.split("/")[0]);
  const endDate = Number(period.end.split("/")[1]);

  /*-------------初回レンダリング時の処理--------------*/
  const fetchFunction = props.fetchFunction;
  useEffect(() => {
    fetchFunction(month.toString(), name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, name]);

  /*-------------来月に移動した時の処理の処理--------------*/
  const moveNextMonth = () => {
    if (!newSubmit) {
      month++;
      if (month > 12) {
        //来月が一月の時の処理
        month = 1;
        setYear(year + 1);
        moveMonth(month);
      } else {
        moveMonth(month);
      }
      setAfterMonthCount(pre=>pre+1)

      props.fetchFunction(month.toString(), name);
    } else {
      //「提出する」を押さずに月を移動しようとした時の処理
      dispatch(setMessage("error", <p>未提出の内容があります</p>));
    }
  };

  /*-------------今月に移動した時の処理の処理--------------*/

  const movePreMonth = () => {
    if (!newSubmit) {
      month--;
      if (month < 1) {
        //今月が１２月の時の処理
        month = 12;
        setYear(year - 1);
        moveMonth(12);
      } else {
        moveMonth(month);
      }

      setAfterMonthCount(pre=>pre-1)

      props.fetchFunction(month.toString(), name);
    } else {
      //「提出する」を押さずに月を移動しようとした時の処理
      dispatch(setMessage("error", <p>未提出の内容があります</p>));
    }
  };

  /*ーーーーー先月末の日付ーーーーーーー*/

  const lastmonth_lastday = new Date(year, month - 1, 1).getDay(); //現在閲覧中の月の前月の最終日の曜日取得
  const lastmonth_lastdate = new Date(year, month - 1, 0).getDate(); //現在閲覧中の月の前月の最終日の日付取得

  for (let i = 0; i < lastmonth_lastday; i++) {
    let withinPeriod_flag = false;
    const preMonthDate = lastmonth_lastdate - i;
    if (beginMonth === endMonth) {
      if (
        month - 1 === beginMonth &&
        beginDate <= preMonthDate &&
        preMonthDate <= endDate
      ) {
        withinPeriod_flag = true;
      }
    } else {
      if (
        (month - 1 === beginMonth && beginDate <= preMonthDate) ||
        (month - 1 !== beginMonth && endDate >= preMonthDate)
      ) {
        withinPeriod_flag = true;
      }
    }
    date_array.unshift(
      <Datebox
        month={false}
        date={preMonthDate}
        data={""}
        isStaffpage={props.isStaffpage}
        newSubmit={newSubmit}
        setNewSubmit={setNewSubmit}
        withinPeriod={withinPeriod_flag}
      />
    );
  }

  /*ーーーーー今月の日付ーーーーーーー*/

  for (let i = 1; i <= month_length; i++) {
    const data = month_data[`${i}`];
    let withinPeriod_flag = false;

    if (beginMonth === endMonth) {
      if (month === beginMonth && beginDate <= i && i <= endDate) {
        withinPeriod_flag = true;
      }
    } else {
      if (
        (month === beginMonth && beginDate <= i) ||
        (month === endMonth && endDate >= i) ||
        ((month !== beginMonth &&  month !== endMonth) && (Math.abs(endMonth - beginMonth) > 1) && (Math.abs(endMonth - beginMonth) < 11)) // 選択した期間の開始と終了の月の真ん中の月

      ) {
        withinPeriod_flag = true;
      }
    }
    date_array.push(
      <Datebox
        month={month}
        date={i}
        data={data}
        isStaffpage={props.isStaffpage}
        newSubmit={newSubmit}
        setNewSubmit={setNewSubmit}
        withinPeriod={withinPeriod_flag}
      />
    );
  }

  /*ーーーーー来月頭の日付ーーーーーーー*/

  const nextmonth_lastday = new Date(year, month, 0).getDay();

  for (let i = 1; i < 7 - nextmonth_lastday; i++) {
    let withinPeriod_flag = false;
    // if (
    //   (month + 1 === beginMonth && i >= beginDate) ||
    //   (month + 1 === endMonth && i <= endDate)
    // ) {
    //   withinPeriod_flag = true;
    // }
    if (beginMonth === endMonth) {
      if (month + 1 === beginMonth && beginDate <= i && i <= endDate) {
        withinPeriod_flag = true;
      }
    } else {
      if (
        (month + 1 === beginMonth && beginDate <= i) ||
        (month + 1 !== beginMonth && endDate >= i)
      ) {
        withinPeriod_flag = true;
      }
    }

    date_array.push(
      <Datebox
        month={false}
        date={i}
        data={""}
        isStaffpage={props.isStaffpage}
        newSubmit={newSubmit}
        setNewSubmit={setNewSubmit}
        withinPeriod={withinPeriod_flag}
      />
    );
  }

  /*ーーーーー日付を一週間ずつに分けるーーーーーーー*/

  const weeks = [];
  const weeksCount = date_array.length / 7; //カレンダーが何週分にわたるかを計算

  for (let i = 0; i < weeksCount; i++) {
    //日付の配列を一週間ごとに区切って配列にまとめる
    weeks.push(date_array.splice(0, 7));
  }

  return (
    <div>
      <div className="spacer_s"></div>
      <div className="margin_padding_0 calender_top">
        <div className="spacer_ss"></div>
        <div className="calender_top_wrap">
          <div className="calender_top_icon">
            {afterMonthCount !== 0  && <ArrowBackIosIcon onClick={movePreMonth} />}
          </div>
          <h3 className="margin_padding_0">{year}年 {month}月</h3>
          <div className="calender_top_icon">
            {afterMonthCount !== 2 &&<ArrowForwardIosIcon onClick={moveNextMonth} />}
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
                  <td key={date_key} className="datebox margin_padding_0">
                    {date}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space_l"></div>
      {props.isStaffpage ? (
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
                dispatch(setIsSubmitted(props.id));
              }
            }}
          ></PrimaryButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Calender;
