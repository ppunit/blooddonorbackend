var mongoose = require('mongoose');

var donorSchema = new mongoose.Schema({
  "uid":String,
  "firstname":String,
  "lastname":String,
  "email":String,
  "password":String,
  "bloodGroup":String,
  "notification":Array,
  "contact":Number,
  "photoURL":String,
  "location":{
    "latitude":Number,
    "longitude":Number,
    "address":String,
    "city":String
  }
});

var Donor = mongoose.model('Donor',donorSchema);

module.exports = {Donor:Donor};
