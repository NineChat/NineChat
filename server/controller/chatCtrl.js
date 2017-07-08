const Message = require('../model/message');
// const messageSchema = require('../model/message');
const User = require('../model/users');
const bodyParser = require('body-parser')

const chatCtrl = {
  addUser(req, res, next){
    console.log('body: ', req.body)
    let username = req.body.username ? req.body.username : "Chris"
    let user = new User({
      username: username,
      // convs: [{conv_id: Number}],
      // fList: [{username: String}]
    })
    user.save((err, savedUser)=>{
      if(err){
        console.error(err)
        res.json(err)
      } else {
        res.json(savedUser)
      }
      next()
    })
  },
  addMsg(data) {
    try {
      msg = JSON.parse(data)
      if ('src' in msg &&
          'dst' in msg &&
          'content' in msg){
        msgDoc = new Message({
          src: msg.src,
          dst: msg.dst,
          message: msg.content
        })
      } else {throw "msg data lacks key"}
    } catch (err) {
      msgDoc = new Message({
        src: "Garret",
        dst: "message_not_json",
        message: data
      })
      console.log(err)
    }
    msgDoc.save((err, doc)=>{
      if (err) return console.error(err)
      console.log('doc saved:', doc)
    })
  },
  getUser(req, res, next){
    User.find({}, (err, result)=>{
      if (err){
        res.json(err)
        console.log(err)
        next()
      } else {
        res.json(result)
        next()
      }
    })
  },
  getMsg(query, callback) {
    Message.find({}, (err, result)=>{
      return callback(err, result)
    })
  },
  getLastTen(userid, callback){
    Message.
      find({}).
      limit(10).
      sort('-date').
      exec((err, result)=>{
        return callback(err, result)
    })
  },
  get(req, res, next){
    let query = {}
    chatCtrl.getMsg(query, (err, messages)=>{
      if (err) {
        console.error(err)
        res.status(418).send(err)
        next()
      } else{
        console.log('found:', messages)
        res.json(messages)
        next()
      }
    })
  }
};

module.exports = chatCtrl
