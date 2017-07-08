//import things here
import React, { Component } from 'react';
import Chatbox from './chatbox';
import Topbar from './topbar';
import Bottombar from './bottombar';
import Userlist from './user-list.jsx';
import UserProfile from './user-profile.jsx';
const io = require('socket.io-client');
const socket = io();

socket.on('connect_error', (error)=>{
  console.log('err');
});

// onopen : recieve all messages from server
// onmessage: recieve new message from server
// send : send message to server.





socket.onerror = function (event) {
  alert('socket exists, but connection doesnt');
}
function getInitialState() {
  return {
    messages: [{id: 'testid' , src: 'testUSER' , dst: 'testRECIEVER' , message: 'I LOVE ME SOME EGGS'},{id: 'testid2' , src: 'testUSER2' , dst: 'testRECIEVER2' , message: 'BUT REALLY HATE TOAST'}],
    friendsList: [{username: 'Janelle69', name: 'Janelle', photo: 'test'},{username: 'Jeffrey69', name:'Heffe', photo: 'test.jpg'}, {username: 'Garrett69', name:'Garrett', photo: 'test.jpg'} ],
    currentChat: {username: '', name:'', photo: ''}
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState()
    // this.sendClick = this.sendClick(); //click handler for send button
    // this.userClick = this.userClick(); //click handler for clicking on user
  }
  componentDidMount(){
    // before executing the set state below, componentDidMount needs to reach out to
    // server via our websocket and pull down the list of messages between user and user[0].
    console.log('yes');
    const currchat = this.state.friendsList[0];
    this.setState({
      currentChat: currchat
    });
  }

  sendClick() {
      // message is sent to server via web socket,
      // message comes back as confirmed to client
      // client pushes it to messages array (SETS STATE)
      // react rerenders
      //textbox value is reset to null

  }

  userClick(user) {
    // update messages to reflect current user, this will require a pull from server
    const chatter = this.state.friendsList[user];
    this.setState({
      currentChat : chatter
    });
  }

  render() {
    const friendsList = this.state.friendsList.slice('');
    const list = this.state.friendsList.map((friend, i) => (
      <Userlist key = {i} userClick = {()=> this.userClick(i)} user = {i} username = {friend.username} name = {friend.name} photo = {friend.photo} />
    ));
    return (
          <div id = "main">
            <div id = "chat">
              <Topbar/>
              <Chatbox messages = {this.state.messages}/>
              <Bottombar/>
            </div>

            <div id = "users">

              <UserProfile currentChat = {this.state.currentChat} />

            <h3>Friends</h3>

              <div className='user-list'>

                <ul>
                  {list}
                </ul>

              </div>
            </div>

          </div>
          )
  }
}


export default App;
