import React, { useEffect, useState, useRef } from "react";
import { auth, db, } from "../firebaseConfig";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


const defaultProps = {
    bgcolor: '#DCDCDC',
    borderColor: '#DCDCDC',
    m: 1,


};

export default function Chat() {
    const [messages, setMessages] = useState([])
    const scroll = useRef()
    const useStyles = makeStyles((theme) => ({
        container: {
            height: '100vh',
        },
        chat: {
            display: "flex",
            flexDirection: "column",
            height: "84vh",
            position: "relative",
            top: "8vh"
        }
    }));
    const classes = useStyles();
    useEffect(() => {

        console.log("firebase");
        if (auth) {
            db.collection('messages').orderBy("createAt").limit(50).onSnapshot((snapshot) => {
                console.log(snapshot);
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                setMessages(data)
            })
        }

    }, [])

    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <Box className={classes.container}>
            <SignOut />
            <Box className={classes.chat} >
                {messages.map(({ id, text, photoURL, uid, createAt }) => (
                    <div className={uid === auth.currentUser.uid ? "sent" : "receive"} key={id} >
                        <span style={{ fontSize: 12, alignItems: "flex-end", display: "flex", position: "relative", bottom: 20, color: "#888888" }}>{
                            new Intl.DateTimeFormat("zh-TW", {
                                hour: "numeric",
                                minute: "numeric"
                            }).format(new Date(createAt * 1000))
                        }</span>
                        <Box borderRadius={16} {...defaultProps}>
                            <p style={{ paddingLeft: 10, paddingRight: 10 }}>{text}</p>
                        </Box>
                        <img src={photoURL} alt="" style={{ borderRadius: "50%", width: 50, height: 50 }} />
                    </div>
                ))}
            </Box>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </Box>

    )
}