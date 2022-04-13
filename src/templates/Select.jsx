import React from "react";
import { useDispatch } from "react-redux";
import { Stafflist } from "../components/StaffList";
import { fetchUserData } from "../reducks/users/operations";

const Select = () => {
    const dispatch = useDispatch()

    const onClickFunction = (id) => {//トップページのスタッフリストのスタッフを選択した時の処理
        dispatch(fetchUserData(id))
    }

    return (
        <>
            <div className="spacer_l"></div>
            <p className="text_p">　スタッフ一覧から自分の名前を選択し、<br/>ログインしてください。</p>
            <div className="spacer_l"></div>
            <div className="wrap">
                <Stafflist onClickFunction={onClickFunction} />
            </div>
        </>
    )
}

export default Select