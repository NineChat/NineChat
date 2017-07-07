const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
 
const app = express();
 
app.use(function (req, res) {
  res.send({ msg: "hello" });
});
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server, clientTracking: true });
let connectList = {}
 
const msgConstructor = (type, content) =>{
  return JSON.stringify({type: type, content: content})
}

wss.on('connection', function connection(ws, req) {
  let id = Object.keys(connectList).length
  connectList[id] = {id: id}
  let content = 'connect_id: ' + id.toString()
  ws.send(msgConstructor("wsConfirmed", content))
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions 
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
 
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    let modifiedMsg = 'msg from server: ' + message
    ws.send(msgConstructor("message", modifiedMsg))
  });
});
 
server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});