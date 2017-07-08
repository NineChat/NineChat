'use strict';

import React, { Component } from 'react'


const UserProfile = (props) => {
    return (
        <div id="user-profile">
            <div id="user-pic">{props.currentChat.photo}</div>
            <div id="user-username">{props.currentChat.username}</div>
            <div id="user-name">{props.currentChat.name}</div>
        </div>
    );
}



export default UserProfile;
