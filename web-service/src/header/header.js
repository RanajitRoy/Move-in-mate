import logo from '../assets/logo.svg'
import React from 'react';
import "./header.css"

function Header(){
    return (
        <div className="Header">
            <img src={logo} id="logo"></img>
            <div id="logo_text">move-in-mate</div>
        </div>
    );
}

export default Header