import React, { Component } from 'react'
import './Login.css'
class Login extends Component {
    render() {
        return (
            <div className="loginBack">
                <div className="loginBox text-center">
                <h2 className="text-white">Login</h2>
                <form>
                <label className="loginLabel" htmlFor="username">Username</label>
                    <input id="username" className="loginInput" type="text"/>
                    <br/>
                    <label className="loginLabel" htmlFor="password">Password</label>
                    <input id="password" className="loginInput" type="password"/>
                </form>
                </div>
                
            </div>
        )
    }
}

export default Login