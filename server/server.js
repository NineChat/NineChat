var express = require('express');
var app = express();
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
let Message = require('./model/message.js')
const chatCtrl = require('./controller/chatCtrl')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname +'./../'));

port = process.env.PORT || 3000
app.get('/', (req, res, next)=>{
console.log()
console.log('cookies from GET req', req.cookies)
console.log()
res.redirect('/messages'); next()});
app.get('/users', chatCtrl.getUser);
app.get('/messages', chatCtrl.get);
app.get('/cookie', (req, res, next)=>{
  console.log('GET route cookie')
  res.cookie('cookie', 'hellooo')
  res.end()
})
app.post('/cookie', (req, res, next)=>{
  console.log('body:', req.body.username)
  res.cookie('username', req.body.username )
  res.end()
  next()
});
app.post('/users', chatCtrl.addUser);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server, clientTracking: true });
let connectList = {}
let chatList = {}
 
const msgConstructor = (type, content) =>{
  return JSON.stringify({type: type, content: content})
}

const sendToAll = data => {
  Object.keys(connectList).forEach(id =>{
    connectList[id].ws.send(data)
  })
}
const findConnections = username =>{
  for (key in connectList) {
    if (connectList.key.username === username){
      return connectList.key.ws
    }
  }
  return undefined 
}
wss.on('connection', function connection(ws, req) {
  let id = Object.keys(connectList).length
  let username = req.headers.username ? req.headers.username : "Garret"
  connectList[id] = {id: id, ws: ws, username: username}

  chatCtrl.getLastTen(username, (err, messages)=>{
    ws.send(JSON.stringify(messages))
  })
  ws.on('message', function incoming(data) {
    console.log('received: %s', data);
    chatCtrl.addMsg(data, (err, savedMsg)=>{
      sendToAll(JSON.stringify(savedMsg))
    })
  });
  ws.on('close', ()=>{
    delete connectList[id]
    console.log('closed %s', id)
  })
});

// app.listen(port)
server.listen(3000)

console.log('server port: ', port)

