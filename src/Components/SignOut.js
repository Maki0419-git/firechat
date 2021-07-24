import { Button } from "@material-ui/core";
import React from "react";
import { auth } from "../firebase";

export default function SignOut() {
    return (
        <div>
            <Button onClick={() => auth.signOut()}>Sign Out</Button>
        </div>
    )
}