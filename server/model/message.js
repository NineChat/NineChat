const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://catlover:ilovetesting@ds151222.mlab.com:51222/ninechat');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

let messagesSchema = mongoose.Schema({
    src: String,
    dst: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

messages = mongoose.model('Messages', messagesSchema)
module.exports = messages 