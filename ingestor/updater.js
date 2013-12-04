var ftpClient = require('ftp'),
    MongoClient = require('mongodb').MongoClient,
    parser = require('./parser'),
    parse = parser['xml'],

    env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ftpConfig = require('./config/shopzilla/ftp'),
    fs = require('fs');
   
var today = new Date();
var dd = today.getDate();
if (dd < 10) dd = '0' + dd;
var mm = today.getMonth() + 1;
if (mm < 10) mm = '0' + mm;
var yyyy = today.getFullYear();
var currentFtpValue = yyyy + mm + dd + '00';

var c = new ftpClient();

MongoClient.connect(config.dbPath, function(err, db) {
  if (err) throw err;
  var deltas = db.collection('deltas');
  deltas.drop();
    c.on('ready', function () {
    c.list('./xml-delta-1.0/', function(err, list) {
        console.log(list); 
        for ( l in list ) {
          if (+l.name > +currentFtpValue){
          currentFtpValue++;
          c.get(l.name + '/publisher_all_updates.xml', function(err, stream) {
            if(err) throw err;
            var updates = stream.read();
            deltas.insert(updates, function(err, result) {
                if (err) throw err;
                console.log('updates inserted into deltas collection');
            });
          });
        }
      }
    });
  });
  db.close();
});


c.connect(ftpConfig);
    