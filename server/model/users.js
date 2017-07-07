const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://catlover:ilovetesting@ds151222.mlab.com:51222/ninechat');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

// place Schemas here





module.exports = function(data) {
  //place code here
};
