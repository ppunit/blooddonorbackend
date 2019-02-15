    var express = require('express');
    var mongoose = require('mongoose');
    var hospitalApi = require('./hospitalAPI.js');
    var donorApi = require('./donorAPI.js');
    var bodyparser = require('body-parser');
    var cors=require('cors')
    var port = "4000";
    var app = express();

    mongoose.connect('mongodb://@ds127545.mlab.com:27545/donor',{useNewUrlParser : true,
                      auth: {
                            user: 'donor7',
                            password: 'mountblue2019'
                          }});

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      app.listen(port,() => {console.log(`Running on ${port}`)})
      console.log("Connected database");
    });
app.use(cors())
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:false}));
    app.use('/api/donor',donorApi);
    app.use('/api/hospital',hospitalApi);
