import { InputBase, IconButton } from "@material-ui/core";
import React, { useState, useRef, useContext } from "react";
import { auth, db } from "../firebaseConfig";
import { ReactComponent as Plane } from "../img/plane.svg";
import { ReactComponent as Image } from "../img/image.svg";
import firebase from "firebase";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Context } from "../Context";



export default function SendMessage({ scroll }) {
    const [message, setMessage] = useState("");
    const myContext = useContext(Context);
    const inputRef = useRef(null);
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
    const sendEvent = async (e, type) => {
        e.preventDefault()
        const { uid, photoURL, displayName } = auth.currentUser;
        let info = {
            uid,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        if (type === "text") {
            info.text = message;
            setMessage("")
        } else if (type === "img") {
            info.img = true;
        }
        const doc = await db.collection("messages").add(info);
        console.log(e.target.files)
        if (type === "img") {
            myContext.setImg(prev => ({ ...prev, [doc.id]: e.target.files }))
        }
        scroll.current.scrollIntoView({ behavior: "smooth" })
    }
    return (

        <form onSubmit={e => sendEvent(e, "text")} className={classes.container}>
            <Box className={classes.sendLeft}>
                <input ref={inputRef}
                    style={{ display: 'none' }}
                    accept=".jpg, .jpeg, .png"
                    id="contained-button-file"
                    multiple type="file"
                    onChange={(e) => sendEvent(e, "img")}
                />
                <Image className={classes.sendIcon} fill="white" onClick={() => inputRef.current.click()} />
                <InputBase placeholder="message..." value={message} onChange={(e) => setMessage(e.target.value)}
                    className={classes.inputBase} />
            </Box>
            <Box className={classes.sendRight}>
                <IconButton type="submit" ><Plane className={classes.sendIcon} fill="white" /></IconButton>
            </Box>
        </form>

    )
}