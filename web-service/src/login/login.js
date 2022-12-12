import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './login.css'

import { handleLogin } from "../services/login-service"


function Login(props){
    const [hide, setHide] = useState(true)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleLoginClick = async () => {
        setLoading(true);
        try{
            const [res, key] = await handleLogin(email, pass)
            console.log(key)
            if(res) {
                props.stateSetter(prevState => {return {...prevState, loggedIn: true, sessionKey: key }});
            } else {
                props.stateSetter(prevState => {return {...prevState, loggedIn: false }})
                setHide(false)
            }
        } finally {
            setLoading(false);
        }
    }

    const handleNameChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }

    if(props.state.loggedIn) {
        return <Navigate to="/home"/>
    } else return (
        <div className="LoginBody">
            <div className="LoginBox">
                <input type="email" placeholder='email' value={email} onChange={handleNameChange} />
                <input type="password" placeholder='password' value={pass} onChange={handlePassChange} />
                <span hidden={hide}>Incorrect credentials</span>
                <input type="button" value="Login" disabled={loading} onClick={handleLoginClick}/>
                <span>Or</span>
                <Link to="/register"><button>Register</button></Link>
            </div>
        </div>
    );
}

export default Login;