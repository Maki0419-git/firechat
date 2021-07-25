import React, { useEffect, useState, useRef } from "react";
import { auth, db, } from "../firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


const defaultProps = {
    bgcolor: '#DCDCDC',
    borderColor: '#DCDCDC',
    m: 1,


};

export default function Chat() {
    const [messages, setMessages] = useState([])
    const scroll = useRef()

    console.log(scroll.current);
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
        <Container style={{ height: '100vh', display: "flex", flexDirection: "column", padding: 0 }}>

            <div style={{ position: "fixed", width: "100%", backgroundColor: "steelblue", justifyContent: "center", zIndex: 2 }}>
                <SignOut />

            </div>
            <div
                style={{ display: "flex", flex: 17, flexDirection: "column", paddingBottom: 50, paddingTop: 50, }}


            >

                {messages.map(({ id, text, photoURL, uid, createAt }) => (


                    <div className={uid === auth.currentUser.uid ? "sent" : "receive"} key={id} >
                        < span style={{ fontSize: 12, alignItems: "flex-end", display: "flex", position: "relative", bottom: 20, color: "#888888" }}>{
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


            </div>


            <div style={{
                backgroundColor: "steelblue", position: "fixed", bottom: 0, width: "100%"
            }}>
                <SendMessage scroll={scroll} />
            </div>
            <div ref={scroll}></div>
        </Container>

    )
}