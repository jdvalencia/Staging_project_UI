import React, { useState } from 'react';
import { Container, Toolbar, FormControl, makeStyles, Typography, InputLabel, Input, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AppUser from '../models/AppUser';
import { authenticate } from '../remote/auth-remote';


export interface ILoginProps {
    authUser: AppUser;
    setAuthUser: (user: AppUser) => void
}

const useStyles = makeStyles({
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    loginForm: {
        width: "50%"
    }
})

function LoginComponent(props: ILoginProps){

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    let updateUsername = (e: any) => {
        setUsername(e.target.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.target.value);
    }

    let login = async () => {
        try{

        let authUser = await authenticate(username, password);
        props.setAuthUser(authUser);
        }
        catch(e){
            setErrorMessage(e.response.data.reason);
        }
    }

    return(
        props.authUser ?
        <Redirect to="/" /> : 
        <>
                <div className={classes.loginContainer}>
                    <form className={classes.loginForm}>
                        <Typography align="center" variant="h4" style={{width: "90%"}}>Login to Event Management!</Typography>

                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input 
                            onChange={updateUsername} 
                            value={username} 
                            id="username" type="text"
                            placeholder="Enter your username" />
                        </FormControl>

                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input 
                            onChange={updatePassword} 
                            value={password} 
                            id="password" type="password"
                            placeholder="Enter your password" />
                        </FormControl>
                        <br/>
                        <br/>
                        <Button onClick={login} variant="contained" color="primary" size="medium">LOGIN</Button>
                        <br/>
                        <br/>
                        {errorMessage ? <Alert severity="error">{errorMessage} </Alert> : <></> }
                    </form>
                </div>
            </>
    );
}

export default LoginComponent;