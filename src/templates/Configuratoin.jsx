import React from "react";
import { PrimaryButton, TextInput } from "../components/UIkit/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Stafflist ,DeleteStaff} from "../components/StaffList/index";
import { addStaff } from "../reducks/member/operations";


const Configuration = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [staffFirstName, setStaffFirstName] = useState("");
    const [staffLastName, setStaffLastName] = useState("");
    const [deleteStaffName, setDeleteStaffName] = useState("");
    const [deleteStaffId, setDeleteStaffId] = useState("");

    const inputFirstName = (event) => {
        setStaffFirstName(event.target.value)
    }

    const inputLastName = (event) => {
        setStaffLastName(event.target.value)
    }



    const onClickFunction = (id, name) => {
        setDeleteStaffName(name)
        setDeleteStaffId(id)
        setOpen(true)
    }


    return (
        <>
            <div className="spacer_m"></div>
            <Stafflist onClickFunction={onClickFunction} />
            <div className="spacer_m"></div>
            <div className="aadstaff_wrap">
                <div className="spacer_m"></div>
                <p>追加するスタッフの名前を入力してください</p>
                <div className="addstaff_inputtext_container">
                    <div className="addstaff_inputtext">
                        <TextInput
                            fullWidth={true} label={"姓"} multiline={false} required={true}
                            rows={1} value={staffLastName} type={"text"} onChange={inputLastName}
                        />
                    </div>
                    <div className="addstaff_inputtext">
                        <TextInput
                            fullWidth={true} label={"名"} multiline={false} required={true}
                            rows={1} value={staffFirstName} type={"text"} onChange={inputFirstName}
                        />
                    </div>
                </div>
                <div className="spacer_s"></div>
                <div className="multiple_buttons_wrap">
                    <PrimaryButton
                        label={"クリア"}
                        onClick={() => {
                            setStaffLastName('');
                            setStaffFirstName('');
                        }}
                    />
                    <PrimaryButton
                        label={"追加"}
                        color="secondary"
                        onClick={() => {
                            dispatch(addStaff(staffLastName, staffFirstName));
                            setStaffLastName('');
                            setStaffFirstName('');
                        }}
                    />
                </div>
                <div className="spacer_m"></div>
            </div>
            <DeleteStaff
                open={open}
                setOpen={setOpen}
                deleteStaffName={deleteStaffName}
                deleteStaffId={deleteStaffId} />
        </>
    )
}

export default Configuration

