import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import { auth } from "../firebase";
import firebase from "firebase";
import "../index.css";
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import { ReactComponent as Chat } from "../chat.svg";
import { ReactComponent as Email } from "../email.svg";
import { ReactComponent as Google } from "../google.svg";
import { ReactComponent as Github } from "../github.svg";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Message from "./Message";
import Sign from "./SignUp";
export default function SignIn() {

    const [signup, setSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        console.log(error)
        if (error) {
            if (error.code === "auth/invalid-email") {
                setMessage("不正確的信箱格式")
                setMessageOpen(true)
            }
            else if (error.code === "auth/wrong-password") {
                setMessage("密碼錯誤")
                setMessageOpen(true)
            }
        }
    }, [error])


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
        input: {
            width: "65%",
            margin: 5,
            backgroundColor: "white", padding: 4, border: "2px solid white",
            borderRadius: "20px",
        },

        btn: {
            padding: 5,
            paddingLeft: 40,
            paddingRight: 40,
            margin: 5,
            borderRadius: 10
        },

        divider: {
            margin: 10,
            color: "black",
            width: "70%"
        },
    }));
    const classes = useStyles();

    return (
        <div style={{ backgroundColor: '#cfe8fc', display: "flex", flexDirection: "column", height: "100vh" }}>
            {console.log(window.innerHeight)}

            <div>
                <Email className="emailIcon" />
            </div>
            <div style={{ display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "center", }}>
                <span className="MainText">Let's Chat!</span>
            </div>
            <div style={{ display: "flex", flex: 3, alignItems: "center", justifyContent: "center" }}>
                <Chat className="mainIcon" />
            </div>

            <div style={{ display: "flex", flex: 5, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <InputBase placeholder="帳號" className={classes.input} value={email} onChange={(e) => setEmail(e.target.value)} error={true} />
                <InputBase placeholder="密碼" className={classes.input} value={password} onChange={(e) => setPassword(e.target.value)} password="true" />
                <div style={{ display: "flex", flexDirection: "row", margin: 10 }}>
                    <Button variant="contained" color="primary" className={classes.btn} onClick={() => signInWithEmailAndPassword(email, password)}>
                        登入
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.btn} onClick={() => setSignUp(true)}>
                        註冊
                    </Button>
                </div>
                <Divider orientation="horizontal" className={classes.divider} />
                <Button variant="contained" className={classes.google}
                    startIcon={<Google className="logoIcon" />}
                    onClick={SignInWithGoogle}><span className="loginText">Sign In With Google  </span></Button>
                <Button variant="contained" className={classes.facebook}
                    startIcon={<Github className="logoIcon" fill="white" />}
                    onClick={SignInWithGitHub}><span className="loginText" >Sign In With GitHub</span></Button>
            </div>
            <Sign signup={signup} setSignUp={setSignUp} />
            <Message messageOpen={messageOpen} setMessageOpen={setMessageOpen} message={message} />
        </div >
    )
}