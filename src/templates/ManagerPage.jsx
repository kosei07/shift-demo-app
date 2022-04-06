import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Calender} from "../components/Shift/index";
import { fetchSubmissionPeriod } from "../reducks/period/operations";
import { getPeriod } from "../reducks/period/selectors";
import { fetchEveryoneMonthData } from "../reducks/shift/operations";
import { getUserData } from "../reducks/users/selectors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { PrimaryButton } from "../components/UIkit/index";
import { fetchisNotSubmittedmember } from "../reducks/member/operations";
import { getMember } from "../reducks/member/selectors";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Badge } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        list: {
            margin: "auto",
            width:"80%",
        },
        listItem:{
            textAlign:"center"
        }
    }),
);


const ManagerPage = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const user_data = getUserData(selector)
    const isNotSubmittedMember = getMember(selector)
    const name = user_data.name
    const id = user_data.id
    const period = getPeriod(selector)
    const [open, setOpen] = useState(false)

    function fetchEveryoneMonthDataFunction(month) {
        dispatch(fetchEveryoneMonthData(month))
    }
    useEffect(() => {
        dispatch(fetchSubmissionPeriod())
        dispatch(fetchisNotSubmittedmember())
    },[])

    console.log('a')
    const onClick = () => {
        setOpen(true)
    }

    return (
        <>
            <div className="margin_padding_0 text_center wrap">
                <h3>{period.begin}~{period.end} 未提出者 : </h3>
                <IconButton onClick={onClick}>
                    <Badge badgeContent={isNotSubmittedMember.length} color="secondary">
                        <AccountCircleIcon />
                    </Badge>
                </IconButton>
            </div>
            <Calender
                name={name}
                id={id}
                period={period}
                isStaffpage={false}
                fetchFunction={fetchEveryoneMonthDataFunction}
            />
            <ListComponent
                open={open}
                setOpen={setOpen}
                period={period}
                length={isNotSubmittedMember.length}
                isNotSubmittedMember={isNotSubmittedMember}
            />
        </>

    )
}

export default ManagerPage

const ListComponent = (props) => {
    const classes = useStyles()
    if (props.open) {
        const begin = props.period.begin
        const end = props.period.end
        return (
            <div className="overlay modal-center">
                <div className="content" onClick={(e) => e.stopPropagation()}>
                    <div className="spacer_m"></div>
                    <p>提出可能期間 : {begin}〜{end}</p>
                    <p>現在の未提出者一覧</p>
                    {props.length ?
                        <>
                            <List className={classes.list}>
                                <Divider />
                                {
                                    props.isNotSubmittedMember.map((name) => {
                                        return (
                                            <>
                                                <ListItem className={classes.listItem}>
                                                    <ListItemText primary={name} />
                                                </ListItem>
                                                <Divider />
                                            </>
                                        )
                                    })
                                }
                            </List>
                        </>
                        :
                        <h3>未提出者はいません</h3>
                    }
                    <div className="spacer_m"></div>
                    <PrimaryButton label={"閉じる"} color="default" onClick={() => props.setOpen(false)}></PrimaryButton>
                    <div className="spacer_s"></div>

                </div>
            </div>

        )
    } else {
        return null
    }

}