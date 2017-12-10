var mongoose = require("mongoose");

module.exports = function(config) {
    /*Interaction with Mongo DB*/
    console.log("trying to connect mongo db"+config.dburl);
    mongoose.connect(config.dburl, { useMongoClient: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
       console.log('Sussessfully connected !!!');
    });
    
}