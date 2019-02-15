var mongoose = require('mongoose');

var hospitalSchema = new mongoose.Schema({
  "hid":String,
  "email":String,
  "name":String,
  "contact":Number,
  "photoURL":String,
  "notificatiton":Array,
  "location":{
    "latitude":Number,
    "longitude":Number,
    "address":String,
    "city":String
  },
  "patient":Array,
  "response":Array
});

var Hospital = mongoose.model('Hospital',hospitalSchema);

module.exports = {Hospital:Hospital};
