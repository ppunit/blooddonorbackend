  var express = require('express');
  var app = express.Router();
  var donorModel = require('../models/donor.js');
  var notificationModel = require('../models/notifications.js');

 var Notifications = notificationModel.Notification;

  var Donor = donorModel.Donor;

  app.post('/',(req,res) => {
    console.log("Inside post")
    Donor.find({email:req.body.email},
       (err,result) => {
       if (result.length == 0){
         req.body["uid"] = req.body["firstname"].slice(0,2)+req.body["lastname"].slice(-2) + (Math.random()*10).toString().slice(0,10);
         console.log(req.body);
         Donor.insertMany(req.body,(err,data) => {
           if (err){
             throw err;
           }
           res.send({"success":"New user is created"});
         });
       }
       else {
         res.send({"error":"User is already exists."});
       }
     })
   })

  //  app.post('/login',(req,res) => {
  //    console.log("Inside post")
  //    Donor.find({email:req.body.email,password:req.body.password},
  //      (err,donorResult) => {
  //        if (err){
  //          throw err;
  //        }
  //        if (donorResult.length != 0){
  //          res.send(donorResult);
  //        }
  //        else {
  //        res.send({"error":"Incorrect credential"});
  //       }
  //    })
  //   })
  app.post('/login',(req,res) => {
    console.log("Inside post")
    Donor.find({email:req.body.email,password:req.body.password},
      (err,donorResult) => {
        if (err){
          throw err;
        }
        if (donorResult.length != 0){
          console.log(donorResult[0].uid);
          Notifications.find({uid:donorResult[0].uid},(err,notificationResult) => {
            if(err){
              throw err;
            }
            if (notificationResult){
              donorResult[0].notification = notificationResult;
              console.log(donorResult);
              res.send(donorResult);
            }
          })
        }
        else {
        res.send({"error":"Incorrect credential"});
       }
    })
   })

    app.get('/notifications',(req,res) => {
     console.log("Inside post")
     Donor.find({email:req.headers.email},{notifications:true},
       (err,donorResult) => {
         if (err){
           throw err;
         }
         if (donorResult.length != 0){
           res.send(donorResult);
         }
         else {
         res.send({"error":"No notification found"});
        }
     })
    })


module.exports = app;
