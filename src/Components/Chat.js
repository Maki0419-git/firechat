import React, { useEffect, useState, useRef } from "react";
import { auth, db, } from "../firebaseConfig";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const defaultProps = {
    bgcolor: '#DCDCDC',
    borderColor: '#DCDCDC',
    m: 1,


};

function stringToHslColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

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
            top: "8vh",
            overflowY: "scroll"
        },
        large: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
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
                {messages.map(({ id, text, uid, createAt }) => (
                    <div className={uid === auth.currentUser.uid ? "sent" : "receive"} key={id} >
                        <span style={{ fontSize: 12, color: "#888888" }}>{
                            new Intl.DateTimeFormat("zh-TW", {
                                hour: "numeric",
                                minute: "numeric"
                            }).format(new Date(createAt * 1000))
                        }</span>
                        <Box borderRadius={16} {...defaultProps}>
                            <p style={{ paddingLeft: 10, paddingRight: 10 }}>{text}</p>
                        </Box>
                        <Avatar className={classes.large} style={{ backgroundColor: stringToHslColor(uid, 30, 85) }}>{uid.split('')[1]}</Avatar>
                    </div>
                ))}
            </Box>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </Box>

    )
}