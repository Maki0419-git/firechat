import React, { useEffect } from 'react'
import { ChatEngine, getMyData } from 'react-chat-engine'
import axios from "axios";
import { auth } from "../firebase";
export default function ChatEngine_() {
    const { uid, displayName, email } = auth.currentUser;


    async function getData() {

        try {
            await axios.get("https://api.chatengine.io/users/me/", {
                method: "GET",
                headers: {
                    "project-id": "c641606b-b56c-4cfa-b21c-744dc61d85d3",
                    "user-name": email,
                    "user-secret": uid
                }
            })
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <ChatEngine
            publicKey='b75e5bd5-cd84-404c-b820-06feff8c98c0'
            userName={email}
            userSecret={uid}
        />
    )
}