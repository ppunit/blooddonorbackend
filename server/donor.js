var mongoose = require('mongoose');

var donorSchema = new mongoose.Schema({
  "uid":String,
  "bloodGroup":String,
  "firstname":String,
  "lastname":String,
  "email":String,
  "password":String,
  "contact":Number,
  "notification":Array;
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
