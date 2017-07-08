const WebSocket = require('ws');
 
const ws = new WebSocket('ws://localhost:3000');
// const ws = new WebSocket('ws://ec2-34-212-61-95.us-west-2.compute.amazonaws.com:3000/');
const msgConstructor = (type, content) =>{
  return JSON.stringify({type: type, content: content})
}
ws.on('open', function open() {
  ws.send(JSON.stringify(
    {src: 'jeff', dst: 'garret', content: 'suck me'}
    ));
  ws.on('message', function (data){
    console.log(data)
  })
});
 
setTimeout(()=>{
  ws.send(JSON.stringify(
    {src: 'jeff', dst: 'ian', content: 'me suck'}
    ));
  setTimeout(()=>{
    ws.send(JSON.stringify(
      {src: 'ian', dst: 'garret', content: 'suck me'}
      ));
  }, 2000)
}, 2000)