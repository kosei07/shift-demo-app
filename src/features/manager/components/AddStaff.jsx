import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStaff } from "../../../reducks/member/operations";
import { PrimaryButton, TextInput } from "../../../UIkit/index";

const AddStaff = (props) => {
  const dispatch = useDispatch();

  const [staffFirstName, setStaffFirstName] = useState("");
  const [staffLastName, setStaffLastName] = useState("");

  const inputFirstName = (event) => {
    //姓の入力時の処理
    setStaffFirstName(event.target.value);
  };

  const inputLastName = (event) => {
    //名の入力時の処理
    setStaffLastName(event.target.value);
  };

  if (props.openAddStaff) {
    //スタッフ管理画面でスタッフリストからスタッフを選択されたときの処理
    return (
      <div className="overlay modal-center">
        <div className="content" onClick={(e) => e.stopPropagation()}>
          <div className="spacer_m"></div>
          <p>追加するスタッフの名前を入力してください</p>
          <div className="addstaff_inputtext_container">
            <div className="addstaff_inputtext">
              <TextInput
                fullWidth={true}
                label={"姓"}
                multiline={false}
                required={true}
                rows={1}
                value={staffLastName}
                type={"text"}
                onChange={inputLastName}
                placeholder={"山田"}
              />
            </div>
            <div className="addstaff_inputtext">
              <TextInput
                fullWidth={true}
                label={"名"}
                multiline={false}
                required={true}
                rows={1}
                value={staffFirstName}
                type={"text"}
                onChange={inputFirstName}
                placeholder={"太郎"}
              />
            </div>
          </div>
          <div className="spacer_s"></div>
          <div className="multiple_buttons_wrap">
            <PrimaryButton
              label={"閉じる"}
              onClick={() => {
                props.setOpenAddStaff(false);
              }}
            />
            <PrimaryButton
              label={"追加"}
              color="secondary"
              onClick={() => {
                dispatch(addStaff(staffLastName, staffFirstName));
                setStaffLastName("");
                setStaffFirstName("");
                props.setOpenAddStaff(false);
              }}
            />
          </div>
          <div className="spacer_m"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AddStaff;
