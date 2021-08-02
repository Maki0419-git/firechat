import { InputBase, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { ReactComponent as Plane } from "../plane.svg";
import { ReactComponent as Image } from "../image.svg";
import firebase from "firebase";
export default function SendMessage({ scroll }) {
    const [message, setMessage] = useState("");

    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL, displayName } = auth.currentUser;
        console.log(displayName);
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

        <form onSubmit={sendMessage} style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flex: 3, alignItems: "center", justifyContent: "center" }}>
                <Image className="sendIcon" fill="white" />
            </div>
            <div style={{ display: "flex", flex: 13 }}>
                <InputBase placeholder="message..." value={message} onChange={(e) => setMessage(e.target.value)}
                    style={{
                        backgroundColor: "white", padding: 3, border: "2px solid white",
                        borderRadius: "10px", width: "100%", alignItems: "center", margin: 5
                    }} />
            </div>
            <div style={{ display: "flex", flex: 3, alignItems: "center", }}>
                <IconButton type="submit" ><Plane className="sendIcon" fill="white" /></IconButton>
            </div>

        </form>

    )
}