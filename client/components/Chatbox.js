import React, { Component } from 'react';

function Chatbox(props){
  let msgs = props.messages.map((message, i) =>{
    return (
      <div key = {message.id} className = "msgcontainer">
        <div className = "msgname">{message.src}:</div>
        <div className = "msg">{message.message}</div>
      </div>
    )
  });
  return (
    <div id ="chatbox">
      {msgs}
    </div>
  )
}

export default Chatbox;
