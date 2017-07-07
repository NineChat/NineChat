import React, { Component } from 'react';

function Bottombar(props){

  return (
    <div id ="bottombar">
      <textarea id ="textbox" placeholder='message...'>
      </textarea>
      <div id = "sendButton" onClick = {()=>{alert()}}>
        	{String.fromCharCode(10004)}
      </div>
    </div>
  )
}

export default Bottombar;
