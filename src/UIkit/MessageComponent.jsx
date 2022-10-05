import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "./index";
import { deleteMessage } from "../reducks/message/operations";
import { getMessage } from "../reducks/message/selectors";

/*--------------メッセージコンポーネントのスタイル---------------*/

const error_style = {
  color: "red",
  background:
    "-webkit-repeating-linear-gradient(-45deg, #f0f8ff, #f0f8ff 3px,rgb(255, 227, 234) 3px, rgb(255, 227, 234) 7px",
  border: "dashed 2px red",
  boxShadow: "0px 0px 0px 2px rgb(230, 200, 200)",
};

const normal_style = {
  color: "black",
  backgroundColor: "ghostwhite",
  border: "solid 1px black",
  boxShadow: "0px 0px 0px 5px ghostwhite",
};

const MessageComponent = () => {
  /*--------------メッセージ情報の取得---------------*/
  const selector = useSelector((state) => state);
  const message = getMessage(selector);
  const type = message.type;
  const text = message.text;

  const dispatch = useDispatch();
  const close = () => {
    //「閉じる」を押した時の処理
    dispatch(deleteMessage());
  };

  if (type) {
    return (
      <div className="overlay modal-center">
        <div
          className="content message_animation"
          onClick={(e) => e.stopPropagation()}
          style={type === "error" ? error_style : normal_style}
        >
          <p>{type === "error" ? "エラー" : ""}</p>
          <div className="message_p">{text}</div>
          <PrimaryButton
            label={"閉じる"}
            color="default"
            onClick={close}
          ></PrimaryButton>
          <div className="spacer_m"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default MessageComponent;
