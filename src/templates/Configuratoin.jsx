import React from "react";
import { useState } from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import { Stafflist, DeleteStaff, AddStaff } from "../components/StaffList/index"
const Configuration = () => {

    const [openDeleteStaff, setOpenDeleteStaff] = useState(false)
    const [openAddStaff, setOpenAddStaff] = useState(false)
    const [deleteStaffName, setDeleteStaffName] = useState("");
    const [deleteStaffId, setDeleteStaffId] = useState("");



    const onClickFunction = (id, name) => {//スタッフリストのスタッフを押した時の処理
        setDeleteStaffName(name)
        setDeleteStaffId(id)
        setOpenDeleteStaff(true)
    }

    const onClickAddStaffButton = () => {//スタッフリストのスタッフを押した時の処理
        setOpenAddStaff(true)
    }


    return (
        <>
            <div className="spacer_m"></div>
            <p className="text_p">　スタッフを追加する場合は「スタッフ追加」を押してください。<br />
                また、スタッフを削除する場合はスタッフ一覧から選んでください。</p>
            <div className="stack_wrap">
                <div className="stack">
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label="スタッフ追加"
                            onClick={onClickAddStaffButton}
                            icon={< AddReactionRoundedIcon />}
                            variant="outlined"
                        />
                    </Stack>
                </div>
            </div>
            <div className="spacer_m"></div>
            <Stafflist onClickFunction={onClickFunction} />
            <div className="spacer_m"></div>
            <DeleteStaff
                openDeleteStaff={openDeleteStaff}
                setOpenDeleteStaff={setOpenDeleteStaff}
                deleteStaffName={deleteStaffName}
                deleteStaffId={deleteStaffId} />
            <AddStaff
                openAddStaff={openAddStaff}
                setOpenAddStaff={setOpenAddStaff}
                deleteStaffName={deleteStaffName}
                deleteStaffId={deleteStaffId} />
        </>
    )
}

export default Configuration

