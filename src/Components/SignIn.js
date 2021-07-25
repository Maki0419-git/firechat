import React from "react";
import Button from '@material-ui/core/Button';
import { auth } from "../firebase";
import firebase from "firebase";
import "../index.css";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ReactComponent as Chat } from "../chat.svg";
import { ReactComponent as Email } from "../email.svg";

import { ReactComponent as Google } from "../google.svg";
import { ReactComponent as Github } from "../github.svg";
export default function SignIn() {

    async function SignInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider)

        } catch (e) { console.log("e:" + e) }
    }
    async function SignInWithGitHub() {
        const provider = new firebase.auth.GithubAuthProvider();
        try {
            await auth.signInWithPopup(provider)

        } catch (e) { console.log("e:" + e.code) }
    }
    const useStyles = makeStyles((theme) => ({
        google: {
            backgroundColor: "white",
            border: "5px solid white",
            borderRadius: 20,
            margin: 10,

        },
        facebook: {
            backgroundColor: "black",
            border: "5px solid black",
            borderRadius: 20,
            margin: 10,
            color: "white",

        },
    }));
    const classes = useStyles();

    return (
        <Container style={{ backgroundColor: '#cfe8fc', height: '100vh', display: "flex", flexDirection: "column" }}>

            <div style={{ display: "flex", flex: 1.5, justifyContent: "flex-start", flexDirection: "row", }}>
                <Email className="emailIcon" />

            </div>
            <div style={{ display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "center", }}>

                <span className="MainText">Let's Chat!</span>


            </div>
            <div style={{ display: "flex", flex: 2, alignItems: "center", justifyContent: "center" }}>
                <Chat className="mainIcon" />
            </div>

            <div style={{ display: "flex", flex: 2, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Button variant="contained" className={classes.google}
                    startIcon={<Google className="logoIcon" />}
                    onClick={SignInWithGoogle}><span className="loginText">Sign In With Google  </span></Button>
                <Button variant="contained" className={classes.facebook}
                    startIcon={<Github className="logoIcon" fill="white" />}
                    onClick={SignInWithGitHub}><span className="loginText" >Sign In With GitHub</span></Button>
            </div>

        </Container>
    )
}