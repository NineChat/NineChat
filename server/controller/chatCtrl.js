const Message = require('../model/message');
// const messageSchema = require('../model/message');
const User = require('../model/users');

const chatCtrl = {
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
  getMsg(query, callback ) {
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
