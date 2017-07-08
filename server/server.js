var express = require('express');
var app = express();
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
let Message = require('./model/message.js')
const chatCtrl = require('./controller/chatCtrl')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname +'./../'));

port = process.env.PORT || 3000
app.get('/', chatCtrl.get);
app.get('/messages', chatCtrl.get);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server, clientTracking: true });
let connectList = {}
let chatList = {}
 
const msgConstructor = (type, content) =>{
  return JSON.stringify({type: type, content: content})
}

wss.on('connection', function connection(ws, req) {
  console.log('body:', req.body)
  console.log('params:', req.params)
  let id = Object.keys(connectList).length
  connectList[id] = {id: id, ws: ws}
  let content = 'connect_id: ' + id.toString()
  ws.send(msgConstructor("wsConfirmed", content))
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions 
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 

  chatCtrl.getLastTen((err, messages)=>{
    console.log('result', messages)
    sendToAll(JSON.stringify(messages))
  })
  // http://mongoosejs.com/docs/queries.html
  // Room.find({}, null, {sort: '-date'}, function(err, docs) { ... });
  const sendToAll = data => {
    Object.keys(connectList).forEach(id =>{
      connectList[id].ws.send(data)
    })
  }
  ws.on('message', function incoming(data) {
    console.log('received: %s', data);
    sendToAll(data)
    chatCtrl.addMsg(data)
  });
  ws.on('close', ()=>{
    delete connectList[id]
    console.log('closed %s', id)
  })
});

// app.listen(port)
server.listen(3000)

console.log('server port: ', port)

