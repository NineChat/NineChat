//import things here
import React, { Component } from 'react';
import Chatbox from './chatbox';
import Topbar from './topbar';
import Bottombar from './bottombar';

function getInitialState() {
  return {
    messages: [{id: 'testid' , src: 'testUSER' , dst: 'testRECIEVER' , message: 'I LOVE ME SOME EGGS'},{id: 'testid2' , src: 'testUSER2' , dst: 'testRECIEVER2' , message: 'BUT REALLY HATE TOAST'}],
    friendsList: [{username: 'test', name: 'test', photo: 'test',}],
    currentChat: {username: 'test', name:'Heffe', photo: 'test.jpg'}
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
    this.sendClick = this.sendClick.bind(this); //click handler for send button
    // this.userClick = this.userClick.bind(this); //click handler for clicking on user
  }

  sendClick () {

  }

  render() {
    return (
          <div id = "main">
            <div id = "chat">
              <Topbar/>
              <Chatbox messages = {this.state.messages}/>
              <Bottombar/>
            </div>

            <div id = "users">
              {/*Jannelles components here*/}
            </div>
          </div>
          )
  }
}


export default App;
