import { InputBase, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { ReactComponent as Plane } from "../img/plane.svg";
import { ReactComponent as Image } from "../img/image.svg";
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
            width: "5vh"
        }
    }));
    const classes = useStyles();
    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL, displayName } = auth.currentUser;
        console.log(displayName);
        await db.collection("messages").add({
            text: message,
            uid,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        scroll.current.scrollIntoView({ behavior: "smooth" })
        setMessage("")

    }
    return (

        <form onSubmit={sendMessage} className={classes.container}>
            <Box className={classes.sendLeft}>
                <Image className={classes.sendIcon} fill="white" />
                <InputBase placeholder="message..." value={message} onChange={(e) => setMessage(e.target.value)}
                    className={classes.inputBase} />
            </Box>
            <Box className={classes.sendRight}>
                <IconButton type="submit" ><Plane className={classes.sendIcon} fill="white" /></IconButton>
            </Box>
        </form>

    )
}