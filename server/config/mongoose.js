var mongoose = require("mongoose");

module.exports = function(config) {
	/*Interaction with Mongo DB*/
	mongoose.connect(config.dburl);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Failed Connecting to Mongo.'));
	db.once('open', function() {
			console.log('Sussessfully connected to Mongo!!!');
	});
}