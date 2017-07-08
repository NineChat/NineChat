'use strict';

import React, { Component } from 'react'


const UserList = (props) => {
    const { userClick, username, user, name, photo } = props;

    return (
      <li onClick={() => userClick()}><img src={photo} className="user-pic" />
        {name}
        {username}
       </li>
    );
}



export default UserList;
