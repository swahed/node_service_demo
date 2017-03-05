const mongoose = require('mongoose');

const Score = require("./../server/models/Score.js");

module.exports.connect = function(dbName){ // catapult
	mongoose.Promise = global.Promise;
	if(!dbName) dbName = "node_service_demo";
	mongoose.connect('mongodb://localhost/' + dbName);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'DB connection error:'));
	db.once('open', function() {
		console.log('DB connected');
		
		db.dropDatabase();   

		var seedData = [
		{
			deviceID : "a",
			points : 10
		}, {
			deviceID : "b",
			points : 20
		},{
			deviceID : "c",
			points : 30
		},{
			deviceID : "d",
			points : 40
		},{
			deviceID : "e",
			points : 60
		}];

		seedData.forEach(function(person){
			console.log("saving");
			new Score(person).save(function (err) {
			  if (err) return console.error(err);
			});
		});
	});

	return db;
}