import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from "../firebase";
import firebase from "firebase";
export default function SignUp({ signup, setSignUp }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailAlert, setEmailAlert] = useState("");
    const [emailWrong, setEnailWrong] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState("");
    const [passwordWrong, setPasswordWrong] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    useEffect(() => {
        if (error) {
            if (error.code === "auth/invalid-email") {
                setEmailAlert("不正確的信箱格式")
                setEnailWrong(true)
            } else if (error.code === "auth/weak-password") {
                setPasswordAlert("密碼長度需為6個字元以上")
                setPasswordWrong(true)
            }
        }
    }, [error])

    return (
        <div>

            <Dialog open={signup}
                //   onClose={handleClose} 
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>

                    <TextField
                        error={emailWrong}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Account"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        helperText={emailAlert}
                    />
                    <TextField
                        error={passwordWrong}
                        helperText={passwordAlert}
                        autoFocus
                        margin="dense"
                        id="pass"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setSignUp(false)}
                        color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => createUserWithEmailAndPassword(email, password)}
                        color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}