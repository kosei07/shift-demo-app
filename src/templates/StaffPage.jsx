import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calender } from "../components/Shift/index";
import { fetchSubmissionPeriod } from "../reducks/period/operations";
import { getPeriod } from "../reducks/period/selectors";
import { fetchMyMonthData } from "../reducks/shift/operations";
import { getUserData } from "../reducks/users/selectors";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { setMessage } from "../reducks/message/operations";

const color_red = {
    color: "red"
}
const color_black = {
    color: "black"
}

const Staffpage = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const user_data = getUserData(selector)
    const period = getPeriod(selector)
    const name = user_data.name
    const id = user_data.id
    const isSubmitted = user_data.isSubmitted
    function fetchMyMonthDataFunction(month, name) {
        dispatch(fetchMyMonthData(month, name))
        dispatch(fetchSubmissionPeriod())
    }


    useEffect(() => {
        dispatch(fetchSubmissionPeriod())
    }, [])

    const onClickHelp = () => {
        dispatch(setMessage("comment", <div>
            <p>カレンダーの日付を選択し、提出内容が確定したら画面右下の「提出する」を押してください。</p>
            <p>提出内容は「提出する」を押した後でも何度でも変更できます。</p>
            <p>提出内容の変更後、「提出する」を押さずに月を移動することはできません。</p>
            <p>また指定されている期間内(日付の背景が白色)にシフトに入れない場合も一度「提出する」を押してください。</p>
        </div>))
    }

    return (
        <>
            <div className="spacer_m"></div>
            <div className="help_wrap">
                <Stack direction="row" spacing={1}>
                    <Chip
                        label="使い方"
                        onClick={onClickHelp}
                        icon={<HelpOutlineIcon />}
                        variant="outlined"
                    />
                </Stack>
            </div>
            <div className="staffpage_top_outside">
                <h2 className="margin_padding_0 text_center">{name} さん</h2>
                <div className="staffpage_top_inside">
                    <h5 className="margin_padding_0">{period.begin}~{period.end}　:　</h5>
                    <h5 style={(isSubmitted) ? color_black : color_red} className="margin_padding_0">{(isSubmitted) ? "提出済み" : "未提出"}</h5>
                </div>
            </div>
            <div className="spacer_s"></div>
            <Calender
                name={name}
                id={id}
                period={period}
                isStaffpage={true}
                isSubmitted={isSubmitted}
                fetchFunction={fetchMyMonthDataFunction} />
        </>
    )
}

export default Staffpage