const WebSocket = require('ws');
 
const ws = new WebSocket('ws://localhost:8080');
 
ws.on('open', function open() {
  ws.send('from client something');
  ws.on('message', function (data){
    let dataJSON = JSON.parse(data)
    console.log(dataJSON.type, dataJSON.content )
  })
});
 
setTimeout(()=>{
  ws.send('delayed message')
}, 2000)