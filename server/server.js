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
app.get('/', (req, res, next)=>{res.redirect('/messages'); next()});
app.get('/users', chatCtrl.getUser);
app.get('/messages', chatCtrl.get);
app.post('/users', chatCtrl.addUser);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server, clientTracking: true });
let connectList = {}
let chatList = {}
 
const msgConstructor = (type, content) =>{
  return JSON.stringify({type: type, content: content})
}

wss.on('connection', function connection(ws, req) {
  console.log('req:', req.headers.userid)
  let id = Object.keys(connectList).length
  let userid = req.headers.userid ? req.headers.userid : "Garret"
  connectList[id] = {id: id, ws: ws}
  let content = 'connect_id: ' + id.toString()
  // ws.send(msgConstructor("wsConfirmed", content))
  console.log(msgConstructor("wsConfirmed", content))
  chatCtrl.getLastTen(userid, (err, messages)=>{
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
    // sendToAll(data)
    chatCtrl.addMsg(data, (err, savedMsg)=>{
      sendToAll(savedMsg)
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

