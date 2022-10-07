import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../reducks/users/selectors";
import { Stafflist } from "./components/index";
import { fetchUserData } from "../../reducks/users/operations";
import { useNavigate } from "react-router-dom";

const Select = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selector = useSelector((state) => state);
  const user_data = getUserData(selector);
  const { name, isSignedIn, role } = user_data;

  const onClickFunction = (id) => {
    // navigate("/home/login");

    //トップページのスタッフリストのスタッフを選択した時の処理
    dispatch(fetchUserData(id));
  };

  useEffect(() => {
    if (name) {
      navigate("/home/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <main className="main_wrap">
      <div className="spacer_l"></div>
      <p className="text_p">
        　スタッフ一覧から自分の名前を選択し、
        <br />
        ログインしてください。
      </p>
      <div className="spacer_l"></div>
      <div className="wrap">
        <Stafflist onClickFunction={onClickFunction} />
      </div>
    </main>
  );
};

export default Select;
