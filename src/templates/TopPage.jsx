import React from "react";
import { useDispatch } from "react-redux";
import { Stafflist } from "../components/StaffList";
import { fetchUserData } from "../reducks/users/operations";

const TopPage = () => {
    const dispatch = useDispatch()

    const onClickFunction = (id) => {
        dispatch(fetchUserData(id))
    }

    return (
        <>
            <div className="spacer_l"></div>
            <div className="spacer_l"></div>
            <p className="text_center">スタッフ一覧から自分の名前を選択してください。</p>
            <div className="spacer_l"></div>
            <div className="wrap">
                <Stafflist onClickFunction={onClickFunction} />
            </div>
        </>
    )
}

export default TopPage