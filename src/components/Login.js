import React, { Component } from 'react'
import Form from './Form'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class Login extends Component {

    state = {
        isNav: false,
        loggedin: false,
        }

    signUp = (user, history) => {
        fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        }).then(response=>response.json())
        .then(result=>{
            if(result["username"] == "This field may not be blank."){
                if(result["password"] == "This field may not be blank."){
                    alert(`USERNAME: ${result["username"]}, PASSWORD: ${result["password"]}`)
                    history.push('/')
                }else alert(`USERNAME: ${result["username"]}`)
                history.push('/')
            }else if(result["password"] == "This field may not be blank."){
                if(result["username"] == "This field may not be blank."){
                    alert(`USERNAME: ${result["username"]}, PASSWORD: ${result["password"]}`)
                    history.push('/')
                }else alert(`PASSWORD: ${result["username"]}`)
                history.push('/')
            }else if(result["username"] != "This field may not be blank."){
                if(result["password"] != "This field may not be blank."){
                    localStorage.setItem('user', result.user.id)
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('username', result.user.username)
                    this.props.toggleLogin()
                        this.setState({
                            loggedin: true,
                            user: result
                        })
                        history.push('/')
                    }
                }else if(result["password"] == "This field may not be blank."){
                    alert(result["password"])
                }
            })
            // .then((result) => {
            //     localStorage.setItem('user', result.user.id)
            //     localStorage.setItem('token', result.token)
            //     localStorage.setItem('username', result.user.username)
            // })
            // .then(()=>{this.props.toggleLogin()
            //     this.setState({
            //         loggedin: true,
            //     })
            //     history.push('/')
            // })
    }

    logIn = (user, history) => {

        fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        }).then(response=>response.json())
        .then(result=>{
            if(result["non_field_errors"]){
                alert(result["non_field_errors"])
                history.push('/')
            }else if(!result["non_field_errors"]){
                localStorage.setItem('user', result.user.id)
                localStorage.setItem('token', result.token)
                localStorage.setItem('username', result.user.username)
                this.props.toggleLogin()
                this.setState({
                    loggedin: true,
                    user: result
                })
                history.push('/')
            }
        })
            // .then((result) => {
            //     localStorage.setItem('user', result.user.id)
            //     localStorage.setItem('token', result.token)
            //     localStorage.setItem('username', result.user.username)
            // })
            // .then(()=>{this.props.toggleLogin()
            //     this.setState({
            //         loggedin: true,
            //     })
            //     history.push('/')
            // })
    }

    showComponent = () => {
        if(!localStorage.token && !this.state.loggedin){
            return [
                <div className="description">
                    <p className="prompt-first">Welcome to OnTrack</p>
                    <p className="prompt">a training schedule management app</p>
                    <br></br>
                    <p className="prompt">If you need a better tactic for keeping yourself</p>
                    <p className="prompt">accountable while training for a race,</p>
                    <p className="prompt">you've come to the right place!</p>
                    <br></br>
                    <p className="prompt">Once registered, you will be able to:</p>
                    <ul>
                        <li>Choose a training schedule</li>
                        <li>Update the schedule when you complete a workout</li>
                        <li>Follow other runners and view their progress</li>
                    </ul>
                </div>,
                <div>
                    <p className="prompt-auth">Sign up or login to get started:</p>
                    <Form history={this.props.history} loginreg={true} signUp={this.signUp} logIn={this.logIn}/>
                </div>
            ]
        }else return null
    }

    render(){
        return(
            <div className="login-page-div">
                    {this.showComponent()}
            </div>
        )
    }
}

export default Login;