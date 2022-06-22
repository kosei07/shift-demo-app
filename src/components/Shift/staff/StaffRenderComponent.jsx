import React from "react";
import Worktime from "./Worktime";
export const StaffRenderComponent = (props) => {
  /*--------------日付の情報の取得--------------*/

  const data = props.data;
  const start = data.start;
  const finish = data.finish;
  const comment = data.comment;

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
      <div>
        <div>
          <p className="s-fontsize text_center">{start}</p>
        </div>
        <div>
          <p className="s-fontsize text_center">{finish}</p>
        </div>
      </div>
    </div>
  );
};
