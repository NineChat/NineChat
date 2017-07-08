import React, { Component } from 'react';

function Bottombar(props){

  return (
    <div id ="bottombar">
      <textarea id ="textbox" value = {props.value} onChange = {(event)=>props.handleChange(event)} onKeyPress = {(event)=>props.handleKeyPress(event)} placeholder='message...'>
          {props.value}
      </textarea>
      <div id = "sendButton"  onClick = {()=>{props.sendClick()}}>
        	{String.fromCharCode(10004)}
      </div>
    </div>
  )
}

export default Bottombar;
