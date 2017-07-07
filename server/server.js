var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname +'./../'));

const msgs = []
const messageGet = (req, res, next)=>{
  console.log('get')
  res.send(msgs)
  next()
}
const messagePost = (req, res, next)=>{
  console.log('posted')
  if(req.body === undefined) res.status(400).send("no body")
  if(req.body.message === undefined || 
    req.body.src === undefined ||
    req.body.dst === undefined){
    res.status(400).send("no message")
    next()
  }
  console.log(req.body)
  let id = msgs.length
  let msg = {
    id: id,
    src: req.body.src,
    dst: req.body.dst,
    message: req.body.message 
  }
  msgs.push(msg)
  res.json(msg)
  next()
}
port = process.env.PORT || 3000
app.get('/', messageGet);
app.get('/messages', messageGet);
app.post('/', messagePost);
app.post('/messages', messagePost);
app.listen(port)

console.log('server port: ', port)
