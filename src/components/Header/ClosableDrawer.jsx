import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { initializeUserData } from '../../reducks/users/operations';
import { getUserData } from '../../reducks/users/selectors';
import { fetchUserData } from '../../reducks/users/operations';
import { initializeMonthData } from '../../reducks/shift/operations';

const useStyles = makeStyles((theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256,
                flexShrink: 0,
            }
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
    }),
);



const ClosableDrawer = (props) => {
    const classes = useStyles()
    const { container } = props

    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor={"left"}
                open={props.open}
                onClose={() => props.onClose()}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true
                }}
            >
                <List>
                    <DrawerMenus onClose={props.onClose} />
                </List>
            </Drawer>
        </nav>
    )
}

export default ClosableDrawer

const DrawerMenus = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const user_data = getUserData(selector)
    const role = user_data.role
    const isSignedIn = user_data.isSignedIn


    const selectMenu = (event, id, path) => {

        props.onClose(event)

        if (id === "manager") {
            dispatch(fetchUserData('kyv39ixrt0')) // ??????????????????????????????
            return
        } else if (id === "toppage") {
            dispatch(initializeUserData());???//state???user???month????????????
            dispatch(initializeMonthData());
        }
        dispatch(push(path))
    }

    const menus_option = [
        [//????????????????????????????????????????????????????????????
            // { func: selectMenu, label: "????????????????????????", icon: <DateRangeIcon />, id: "manager", value: "" },
            { func: selectMenu, label: "??????????????????", icon: <LogoutIcon />, id: "toppage", value: "/" }
        ],
        [//????????????????????????????????????
            { func: selectMenu, label: "???????????????", icon: <DateRangeIcon />, id: "calender", value: "/staffpage" },
            { func: selectMenu, label: "?????????????????????", icon: <SettingsIcon />, id: "setting", value: "/resetpassword" },
            { func: selectMenu, label: "???????????????", icon: <LogoutIcon />, id: "toppage", value: "/" }
        ],
        [//???????????????????????????????????????
            { func: selectMenu, label: "???????????????", icon: <DateRangeIcon />, id: "calender", value: "/managerpage" },
            { func: selectMenu, label: "????????????", icon: <CheckBoxIcon />, id: "submittion", value: "/managerpage/shiftperiod" },
            { func: selectMenu, label: "??????????????????", icon: <PersonAddAltIcon />, id: "configration", value: "/managerpage/configuration" },
            { func: selectMenu, label: "?????????????????????", icon: <SettingsIcon />, id: "setting", value: "/resetpassword" },
            { func: selectMenu, label: "???????????????", icon: <LogoutIcon />, id: "toppage", value: "/" }
        ]
    ]

    let menus = []

    if (role !== "" && isSignedIn) { //????????????????????????????????????????????????????????????
        if (role === "staff") {
            menus = menus_option[1]
        } else if (role === "manager") {
            menus = menus_option[2]
        }
    } else {
        menus = menus_option[0]
    }

    return (
        <>
            <div  className="header_menu">
                <h1>menu</h1>
            </div>
            {menus.map((menu) => (
                <ListItem
                    key={menu.id}
                    button
                    onClick={(event) => { menu.func(event, menu.id, menu.value) }}>
                    <ListItemIcon>
                        {menu.icon}
                    </ListItemIcon>
                    <ListItemText primary={menu.label} />
                </ListItem>
            ))}
        </>
    )
}
