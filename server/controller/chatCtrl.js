const Message = require('../model/message');

const chatCtrl = {
  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student
  addMsg(req, res) {
    console.log('create', req.body)
    let msgDoc = new Message({
      src: 'Jeff',
      dst: 'Gar',
      message: msg.content})
    msgDoc.save((err, doc)=>{
      if (err) {
        res.status(418).send(err)
        console.log(err)
        next()
      } else {
        res.json(doc)
        console.log('doc saved:', doc)
      }
    })
  },

  // Get a student from the database and send it in the response
  // Their first name will be in the request parameter 'name'
  // This should send the found student
  getMsg(query, callback ) {
    Message.find({}, (err, result)=>{
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
