'use strict';

import React, { Component } from 'react'


const UserList = (props) => {
    const { userClick, UserList } = props;
    const list = UserList.map((user, i) => {
        <li key={i} onClick={() => { userClick() }}><img src={user.photo} className="user-pic" />
            {user.name}
            {user.username}
        </li>
    });
    return (
        <div className='user-list'>
            <ul>
                {list}
            </ul>
        </div>
    );
}



export default UserList;