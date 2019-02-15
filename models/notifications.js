var mongoose = require('mongoose');

var notificationsSchema = new mongoose.Schema({
 "uid":String,
 "hid":String,
 "hospitalname":String,
 "hospitalAddress":String,
 "latitude":Number,
 "longitude":Number,
 "bloodGroup":String
});

var Notification = mongoose.model('Notification',notificationsSchema);

module.exports = {Notification:Notification};