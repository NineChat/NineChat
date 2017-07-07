'use strict';

import React, { Component } from 'react'


const UserProfile = (props) => {
    return (
        <div id="user-profile">
            <div id="user-pic">{currentChat.photo}</div>
            <div id="user-username">{currentChat.username}</div>
            <div id="user-name">{currentChat.name}</div>
        </div>
    );
}



export default UserProfile;
