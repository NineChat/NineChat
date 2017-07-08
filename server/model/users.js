const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://catlover:ilovetesting@ds151222.mlab.com:51222/ninechat');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

let usersSchema = mongoose.Schema({
    // user_id: String,
    username: {
      type: String,
      unique : true,
      required : true,
      dropDups: true
    },
    convs: [{conv_id: Number}],
    fList: [{username: String}]
});

users = mongoose.model('Users', usersSchema)
module.exports = users