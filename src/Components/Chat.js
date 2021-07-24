import React, { useEffect, useState, useRef } from "react";
import { auth, db, } from "../firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const defaultProps = {
    bgcolor: '#DCDCDC',
    borderColor: '#DCDCDC',
    m: 2,


};

export default function Chat() {
    const [messages, setMessages] = useState([])
    const scroll = useRef()
    console.log(scroll.current);
    useEffect(() => {


        db.collection('messages').orderBy("createAt").limit(50).onSnapshot((snapshot) => {
            console.log(snapshot);
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setMessages(data)
        })

    }, [])




    return (
        <Container style={{ height: '100vh', display: "flex", flexDirection: "column", padding: 0 }}>

            <div style={{ position: "fixed", width: "100%", backgroundColor: "steelblue", justifyContent: "center" }}>
                <SignOut />

            </div>
            <div style={{ display: "flex", flex: 17, flexDirection: "column", paddingBottom: 30, paddingTop: 50 }}>

                {messages.map(({ id, text, photoURL, uid }) => (


                    <div className={uid === auth.currentUser.uid ? "sent" : "receive"} key={id} >
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
        // <div>
        //     <SendMessage scroll={scroll} />
        //     <SignOut />

        //     {console.log(messages)}
        //     <div>

        //     </div>
        //     <div ref={scroll}></div>
        // </div>
    )
}