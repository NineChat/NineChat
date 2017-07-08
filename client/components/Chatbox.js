import React, { Component } from 'react';

function Chatbox(props){
  if (props.messages.length > 0) {
    const msgs = props.messages.map((message, i) =>{
      return (
        <div key = {message._id} className = "msgcontainer">
          <div className = "msgname">{message.src}:</div>
          <div className = "msg">{message.message}</div>
        </div>
      )
    });
    return (
        {msgs}
    )
  }
  return null;
}

export default Chatbox;
