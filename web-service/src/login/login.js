import './login.css'

function Login(){
    return (
        <div className="LoginBody">
            <div className="LoginBox">
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <input type="button" value="Login" />
                <span>Or</span>
                <input type="button" value="Register" />
            </div>
        </div>
    );
}

export default Login;