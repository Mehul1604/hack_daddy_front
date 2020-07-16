import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
class Login extends Component {
    
    fetchUsers = async () =>{
        const Users = await axios.get('/user')
        this.setState({Users : Users.data})
    }

    async componentDidMount(){
        this.fetchUsers()
    }
    state = {
        Users : null,
        name : '',
        email :  '',
        username : '',
        password : '',
        role : false,
        loginUser : '',
        loginPassword : '',
        accessToken : null
    }

    createForm = React.createRef()

    formReset = () =>{
        this.createForm.current.reset();
    }

    handleCreateChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
        //console.log(this.state)
    }

    handleLoginChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
        //console.log(this.state)
    }

    roleSelect = (e) =>{
        this.setState({
            role : e.target.value
        })
        //console.log(this.state)
    }

    handleCreate = async (e) =>{
        e.preventDefault();
        const newUser = {
            name : this.state.name,
            email : this.state.email,
            username : this.state.username,
            password : this.state.password,
            role : this.state.role
        }

        const createdUser = await axios.post('/user' , newUser)
        console.log('created user is ' , createdUser)
        this.setState({
            name : '',
            email : '',
            username : '',
            password : '',
            role : false
        })
    }
    
    handleLogin = async (e) =>{
        e.preventDefault();
        const login = {
            username : this.state.loginUser,
            password : this.state.loginPassword
        }

        axios.post('/login' , login)
        .then(accesstoken => {
            console.log(accesstoken.data)
            localStorage.setItem('access_token' , accesstoken.data.access_token)
            this.setState({
                loginUser : '',
                loginPassword : '',
                accessToken : accesstoken.data.access_token
            })  
        })
        .catch(err => {
            if(err.response){
                console.log(err.response.status)
                alert("You entered wrong username / password -> go sacrifice goats")
                window.location.reload()
            }
        })
        

    }

    render() {
        
        if(this.state.accessToken){
            console.log('recieved token' , this.state.accessToken)
            return <Redirect to="/"/>
        }
        return (
            <div className="loginBack">
                <div className="loginBox text-center">
                <h2 className="text-white">Login</h2>
                <form onSubmit={this.handleLogin}>
                <label className="loginLabel" htmlFor="username">Username</label>
                    <input name="loginUser" id="username" className="loginInput" type="text" onChange={this.handleLoginChange}/>
                    <br/>
                    <label className="loginLabel" htmlFor="password">Password</label>
                    <input name="loginPassword" id="password" className="loginInput" type="password" onChange={this.handleLoginChange}/>
                    <br/>
                    <button type="submit">Login</button>
                </form>
                <br/>
                <button type="button"   data-toggle="modal" data-target="#createModal">
                      <span>Create account</span>
                    </button>
                </div>

                {/*Modal start */}
                <div className="modal fade "  tabIndex="-1" id="createModal" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content mainModal">

                          <div className="modal-header">
                            <h2 className="modal-title  mx-auto">Create New Account</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <form onSubmit={this.handleCreate} ref={this.createForm}>
                          <div className="modal-body">
                            <div>
                            
                                
                                <div className="group">
                                <input  name='name' type="text" required="required" onChange={this.handleCreateChange}/>
                                <label>Name</label>
                                </div>
                                <div className="group">
                                <input  name='email' type="email" required="required" onChange={this.handleCreateChange}/>
                                <label>Email</label>
                                </div>
                                <div className="group">
                                <input  name='username' type="text" required="required" onChange={this.handleCreateChange}/>
                                <label>Username</label>
                                </div>
                                <div className="group">
                                <input  name='password' type="password" required="required" onChange={this.handleCreateChange}/>
                                <label>Password</label>
                                </div>
                                <div className="group">
                                    <input defaultChecked type="radio" id="viewer" name="role" value={false} onClick={this.roleSelect}/>
                                    <label htmlFor="viewer">Viewer</label><br/>
                                    <input type="radio" id="contributor" name="role" value={true} onClick={this.roleSelect}/>
                                    <label htmlFor="contributor">Contributor</label><br/>
                                </div>
                            
                            </div>
                          </div>
                          <div className="modal-footer">

                            <div className="btn-box">
                              <button type="submit">Create</button>
                              <button onClick={this.formReset} data-dismiss="modal">Close</button>
                           </div>

                          </div>
                          </form>
                        </div>
                      </div>
                    </div>
                
            </div>
        )
    }
}

export default Login