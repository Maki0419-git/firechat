import { InputBase, IconButton } from "@material-ui/core";
import React, { useState, useRef, useContext } from "react";
import { auth, db } from "../firebaseConfig";
import { ReactComponent as Plane } from "../img/plane.svg";
import firebase from "firebase";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';




export default function SendMessage({ scroll }) {
    const [message, setMessage] = useState("");
    const useStyles = makeStyles((theme) => ({
        container: {
            backgroundColor: "steelblue",
            position: "fixed",
            bottom: 0,
            width: "100%",
            height: "8vh",
            display: "flex",
            justifyContent: "space-between",
        },
        sendLeft: {
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginLeft: "1%"
        },
        sendRight: {
            display: "flex",
            alignItems: "center",

        },
        inputBase: {
            backgroundColor: "white",
            padding: 3,
            border: "2px solid white",
            borderRadius: "10px",
            width: "100%",
            alignItems: "center",
            marginLeft: "1%"
        },
        sendIcon: {
            height: "5vh",
            width: "5vh",
            cursor: "pointer"
        }
    }));
    const classes = useStyles();
    const sendEvent = async () => {

        const { uid, } = auth.currentUser;
        let info = {
            uid,
            createAt: firebase.firestore.FieldValue.serverTimestamp(),
            text: message
        }
        const doc = await db.collection("messages").add(info);
        scroll.current.scrollIntoView({ behavior: "smooth" })
    }
    return (

        <Box className={classes.container}>
            <Box className={classes.sendLeft}>
                <InputBase placeholder="message..." value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={classes.inputBase}
                    onKeyPress={(e) => e.key === 'Enter' && sendEvent()}
                />
            </Box>
            <Box className={classes.sendRight}>
                <IconButton onClick={sendEvent} ><Plane className={classes.sendIcon} fill="white" /></IconButton>
            </Box>
        </Box>

    )
}