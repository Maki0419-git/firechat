import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
export default function SendMessage({ scroll }) {
    const [message, setMessage] = useState("");

    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser;

        await db.collection("messages").add({
            text: message,
            uid,
            photoURL,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        scroll.current.scrollIntoView({ behavior: "smooth" })
        setMessage("")

    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <Input placeholder="message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button type="submit" >Send</Button>
            </form>
        </div>
    )
}