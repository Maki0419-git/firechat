
import { ReactComponent as Logout } from "../img/logout.svg";
import React from "react";
import { auth } from "../firebaseConfig";
import "../index.css";
import { IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function SignOut() {
    const useStyles = makeStyles((theme) => ({
        container: {
            position: "fixed",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
            backgroundColor: "steelblue",
            zIndex: 2,
            width: "100%",
            height: "8vh",
        }
    }));
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <span className="NavText">Let's Chat!</span>
            <IconButton onClick={() => auth.signOut()}><Logout className="sendIcon" fill="white" /></IconButton>
        </Box>
    )
}