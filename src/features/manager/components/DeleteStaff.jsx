import React from "react";
import { useDispatch } from "react-redux";
import { deleteStaff } from "../../../reducks/member/operations";
import { PrimaryButton } from "../../../UIkit/index";

const DeleteStaff = (props) => {
  const dispatch = useDispatch();

  if (props.openDeleteStaff) {
    //スタッフ管理画面でスタッフリストからスタッフを選択されたときの処理
    return (
      <div className="overlay modal-center">
        <div className="content" onClick={(e) => e.stopPropagation()}>
          <div className="spacer_m"></div>
          <p>{props.deleteStaffName}さんを一覧から削除しますか？</p>
          <div className="spacer_s"></div>
          <div className="multiple_buttons_wrap">
            <PrimaryButton
              label={"キャンセル"}
              color="default"
              onClick={() => props.setOpenDeleteStaff(false)}
            ></PrimaryButton>
            <PrimaryButton
              label={"OK"}
              color="secondary"
              onClick={() => {
                dispatch(
                  deleteStaff(props.deleteStaffId, props.deleteStaffName)
                );
                props.setOpenDeleteStaff(false);
              }}
            ></PrimaryButton>
          </div>
          <div className="spacer_m"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DeleteStaff;
