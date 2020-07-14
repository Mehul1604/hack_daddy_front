import React, { Component } from 'react'
import './Login.css'
class Login extends Component {
    render() {
        return (
            <div className="loginBack">
                <div className="loginBox text-center">
                <h2 className="text-white">Login</h2>
                <form>
                    <input className="loginInput" type="text"/>
                </form>
                </div>
                
            </div>
        )
    }
}

export default Login