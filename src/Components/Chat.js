import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
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
        <div>
            <SendMessage scroll={scroll} />
            <SignOut />

            {console.log(messages)}
            <div>
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div key={id}>
                        <div className={uid === auth.currentUser.uid ? "sent" : "receive"}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={scroll}></div>
        </div>
    )
}