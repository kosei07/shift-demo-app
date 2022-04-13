import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ClosableDrawer } from ".";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            border: '#444'
        },
        menuBar: {
            backgroundColor: "#fff",
            color: '#444',
        },
        toolbar: {
            margin: '0 auto',
            maxWidth: 1024,
            width: '100%'
        },
        menuIcon:{
            position :"absolute",
            right: 50
        }
    }),
);

const Header = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    
    const handleDrawerToggle =() => { //closableDrawerを開く
        setOpen(!open)
    }


    return (
        <>
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                    <h1 className="header_h1">シフトアプリ</h1>
                    <IconButton className={classes.menuIcon} onClick={(event) => handleDrawerToggle(event)}>
                        <MenuIcon fontSize="large"/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />           
        </div>
        </>
        )
}

export default Header