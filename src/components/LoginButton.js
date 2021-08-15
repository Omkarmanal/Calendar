
import { useAuth0 } from '@auth0/auth0-react';
import "./loginButton.css"
import React from 'react';


function LoginButton() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    
    return (
        !isAuthenticated && (
            <div>
            <div className="login">
                <div className="wrapper">
                    <h2>Welcome!</h2>
                    <h2>To</h2>
                    <h1>
                        My Calendar
                    </h1>
                    <h3>Login To Continue</h3>
                    <button className="login_btn" onClick={() => loginWithRedirect()}>
                        Log In
                    </button>
                </div>
            </div>
            </div>
        )
    )
}

export default LoginButton
