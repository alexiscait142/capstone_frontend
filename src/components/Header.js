import React, { Component } from 'react'
import {Navbar} from './Navbar'

export const Header = (props) => {
    return(
        <div className="header">
            <h1>OnTrack</h1>
            {props.loggedin || localStorage.token ? <button onClick={props.toggleNav} className="navbutton"></button> : null}
        </div>
    )
}