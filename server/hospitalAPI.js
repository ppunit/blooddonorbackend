var express = require('express');
const Nexmo = require('nexmo');
var app = express.Router();
var hospitalModel = require('../models/hospitals.js');
var donorModel = require('../models/donor.js');
var notificationModel = require('../models/notifications.js');

var Notification = notificationModel.Notification;
var Donor = donorModel.Donor;
var Hospital = hospitalModel.Hospital;

const nexmo = new Nexmo({
 apiKey: 'befff361',
 apiSecret: 'EuTbLWTa4fJFFx9X'
},{debug:true});


/ *hospital signup*/
app.post('/',(req,res) => {
 console.log("Inside post")
 Hospital.find({hid:req.body.hid},
    (err,hospitalResult) => {
    if (hospitalResult.length == 0){
      Hospital.insertMany(req.body,(err,data) => {
        if (err){
          throw err;
        }
        res.send({"success":"New Hospital is created"});
      });
    }
    else {
      res.send({"error":"Hospital is already exists."});
    }
  })
})


// / *hospital login*/

app.post('/login',(req,res) => {
  console.log("Inside post")
  Hospital.find({hid:req.body.hid},
    (err,hospitalResult) => {
      if (err){
        throw err;
      }
      if (hospitalResult.length != 0){
        res.send(hospitalResult);
      }
      else {
      res.send({"error":"Hospital is not exist"});
     }
  })
 })


//  / *get every hospital details*/
     app.get('/:id',(req,res) => {
       console.log(req.params.id);
       // var id = req.params.id.toString();
        Hospital.find({hid:req.params.id},
         (err,result) => {
           if (err){
             throw err;
           }
           if (result.length != 0){
             res.send(result);
           }
           else {
           res.send({"error":"not found"});
          }
       })
      })


//  / *new patient add*/
 app.post('/patient',(req,res) => {
   console.log(typeof(req.body));
   const from = "Nexmo"

    Hospital.updateOne({hid:req.headers.hid},{$addToSet:{patient:req.body}},
     (err,result) => {
       if (err){
         throw err;
       }
       if (result.length != 0){
         Donor.find({bloodGroup:req.body.bloodgroup},(err,allDonor) =>{
           if (err){
             throw err;
           }else{
             console.log(allDonor);
             res.send(allDonor);
             console.log(typeof(updateBody));
             var to = '917760253907';
             allDonor.forEach((donor) =>{
               const text = "Greeting from "+req.headers.name+" we need blood of "+req.body.bloodGroup;
               nexmo.message.sendSms(from,to,text);
               var updateBody = {hid:req.headers.hid,uid:donor.uid,hospitalname:req.headers.name,hospitalAddress:req.headers.address,longitude:req.headers.longitude,latitude:req.headers.latitude,bloodGroup:req.body.bloodgroup};
               console.log(updateBody);
               Notification.insertMany(updateBody);
               console.log(donor._id);
               console.log(to);
             })
             console.log("Success");
           }
         });

         // res.send(result);
       }
       else {
       res.send({"error":"not inserted"});
      }
   })
  })


  // / *get all patient details*/
  app.get('/patients',(req,res) => {
     Hospital.find({uid:req.headers.uid},{"patient":true},
      (err,result) => {
        if (err){
          throw err;
        }
        if (result.length != 0){
          result = result[0]["patient"];
          res.send(result);
        }
        else {
        res.send({"error":"not found"});
       }
    })
   })

   app.get('/response',(req,res) =>{
    Hospital.find((err,result) => {
      if (err){
        throw err;
      } else {
        res.send(result);
      }
    })
  })
 
  app.post('/response',(req,res) => {
    console.log(req.headers)
    Hospital.updateOne({hid:req.headers.hid},{$push:{response:req.body}},
      (err,result) => {
      if (err) {
        throw err;
      } if(res.statusCode === 200) {
        res.send(req.body);
      } else {
        res.send("not updated")
      }
    })
  })

module.exports = app;