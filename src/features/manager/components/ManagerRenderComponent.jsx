import Shiftcheck from "./Shiftcheck";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../reducks/message/operations";

const ManagerRenderComponent = (props) => {
  const data = props.data;
  const list = data.list;
  const length = data.length;
  const ary = [];
  const dispatch = useDispatch();

  /*----------スタッフのシフト一覧のスタイル-------------*/
  const holidaystyle = {
    //希望休の時の文字のスタイル
    color: "blue",
  };

  const defaultstyle = {
    //希望休以外の時の文字のスタイル
    color: "#000",
  };
  /*----------スタッフのシフト一覧を生成-------------*/
  for (const key in list) {
    //提出されたその日のシフト情報を配列にpush
    for (const name in list[key]) {
      ary.push(
        <tr key={key}>
          <td>{key}</td>
          <td
            style={
              list[key][name].start === "希望休" ? holidaystyle : defaultstyle
            }
          >
            {list[key][name].start}
          </td>
          <td>{list[key][name].finish}</td>
          <td>
            {list[key][name].comment !== "" && (
              <button
                className="lookcommentbutton"
                onClick={() =>
                  dispatch(
                    setMessage(
                      "comment",
                      <div>
                        <p>{name}さん</p>
                        <p>{list[key][name].comment}</p>
                      </div>
                    )
                  )
                }
                type="button"
              >
                詳細
              </button>
            )}
          </td>
        </tr>
      );
    }
  }

  /*------------------日付ごとのシフトに入れる人数によって表示される円の色を変える-------------------*/

  let color = "lightgray";

  if (length === 1 || length === 2) {
    color = "khaki";
  } else if (length === 3 || length === 4) {
    color = "orange";
  } else if (length === 5 || length === 6) {
    color = "tomato";
  } else if (length >= 7) {
    color = "red";
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
      {props.month ? (
        <p
          className="datebox_manager_component_radius"
          style={{ backgroundColor: color }}
        ></p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ManagerRenderComponent;
