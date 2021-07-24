
import { ReactComponent as Logout } from "../logout.svg";
import React from "react";
import { auth } from "../firebase";
import "../index.css";
import { IconButton } from "@material-ui/core";
export default function SignOut() {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flex: 4, justifyContent: "center" }}>
                <span className="NavText">Let's Chat!</span>
            </div>
            <div style={{ display: "flex", flex: 6, justifyContent: "center" }}>

            </div>
            <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
                <IconButton onClick={() => auth.signOut()}><Logout className="sendIcon" fill="white" /></IconButton>
            </div>
        </div>
    )
}