import React, { Component } from 'react'

class Home extends Component {

    state = {
        accessToken : localStorage.getItem('access_token')
    }
    render() {

        console.log('home page got access token as ' , this.state.accessToken)
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        )
    }
}

export default Home