import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase";
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


    function Message({ data }) {

        if (data.uid === auth.currentUser.uid) {
            return (
                <div className={"sent"} key={data.id} >
                    <Box borderRadius={16} {...defaultProps}>
                        <p style={{ paddingLeft: 10, paddingRight: 10 }}>{data.text}</p>
                    </Box>
                    <img src={data.photoURL} alt="" style={{ borderRadius: "50%", width: 50, height: 50 }} />
                </div>
            )
        } else {
            return (
                <div className={"receive"} key={data.id} >
                    <img src={data.photoURL} alt="" style={{ borderRadius: "50%", width: 50, height: 50 }} />
                    <Box borderRadius={16} {...defaultProps}>
                        <p style={{ paddingLeft: 10, paddingRight: 10 }}>{data.text}</p>
                    </Box>
                </div>
            )
        }

    }

    return (
        <Container style={{ height: '100vh', display: "flex", flexDirection: "column", padding: 0 }}>

            <div style={{ display: "flex", flex: 1.5, flexDirection: "column", backgroundColor: "steelblue", justifyContent: "center" }}>
                <SignOut />

            </div>
            <div style={{ display: "flex", flex: 17, flexDirection: "column" }}>

                {messages.map((data) => (


                    <Message data={data} />




                ))}


            </div>

            <div style={{ display: "flex", flex: 2, justifyContent: "center", flexDirection: "column", backgroundColor: "steelblue" }}>
                <SendMessage scroll={scroll} />
            </div>

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