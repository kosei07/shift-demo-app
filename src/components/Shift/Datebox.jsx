import React from "react";
import { useState, useEffect } from "react";
import { StaffRenderComponent } from "./staff/StaffRenderComponent";
import { ManagerRenderComponent } from "./manager/ManagerRenderComponent";
/*-------------------それぞれの日付のスタイル-------------------*/

// 通常のスタイル
const defaultStyle = {
  color: "black",
};
// シフトを更新したときのスタイル
const updateSubmitStyle = {
  backgroundColor: "rgba(255, 160, 122, 0.3)",
  color: "black",
};
// 閲覧中の月の提出期間外のスタイル
const viewMonth_outOfPeriodStyle = {
  pointerEvents: "none",
  backgroundColor: "rgba(128, 128, 128, 0.4)",
  color: "black",
};
// 閲覧中以外の月の提出期間外のスタイル
const anotherMonth_outofPeriodStyle = {
  pointerEvents: "none",
  color: " rgba(35, 35, 35, 0.2)",
  backgroundColor: "rgba(128, 128, 128, 0.4)",
};

// 閲覧中以外の月の提出期間内のスタイル
const anotherMonth_withinPeriodStyle = {
  pointerEvents: "none",
  color: " rgba(35, 35, 35, 0.2)",
};

export const Datebox = (props) => {
  /*--------------日付の情報の取得--------------*/
  const date = props.date;
  const data = props.data;
  const isStaffpage = props.isStaffpage;
  const month = props.month;
  const withinPeriod = props.withinPeriod;

  const [style, setStyle] = useState(defaultStyle); //それぞれの日付のスタイルを設定する
  const [updateSubmit, setUpdateSubmit] = useState(false); //シフトの情報変更の有無

  const [show, setShow] = useState(false);

  const open = () => {
    //shiftcheckもしくはworktimeを開く
    setShow(true);
  };

  useEffect(() => {
    if (isStaffpage) {
      if (month) {
        if (withinPeriod) {
          if (props.newSubmit && updateSubmit) {
            setStyle(updateSubmitStyle);
          } else {
            setStyle(defaultStyle);
          }
        } else {
          setStyle(viewMonth_outOfPeriodStyle);
        }
      } else {
        if (withinPeriod) {
          setStyle(anotherMonth_withinPeriodStyle);
        } else {
          setStyle(anotherMonth_outofPeriodStyle);
        }
      }
    } else {
      if (month) {
        setStyle(defaultStyle);
      } else {
        setStyle(anotherMonth_outofPeriodStyle);
      }
    }
  }, [month, updateSubmit, props.newSubmit, withinPeriod, isStaffpage]);

  return (
    <div className="datebox_wrap" style={style} onClick={open}>
      <div>
        <p className="datebox_date">{date}</p>
      </div>
      {isStaffpage ? (
        <StaffRenderComponent
          month={month}
          date={date}
          data={data}
          show={show}
          setShow={setShow}
          setUpdateSubmit={setUpdateSubmit}
          setNewSubmit={props.setNewSubmit}
          //   setStyle={setStyle}
          withinPeriod={withinPeriod}
        />
      ) : (
        <div>
          <ManagerRenderComponent
            month={month}
            date={date}
            data={data}
            show={show}
            setShow={setShow}
          />
        </div>
      )}
    </div>
  );
};

export default Datebox;
