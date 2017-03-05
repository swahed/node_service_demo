const mongoose = require('mongoose');

const ScoreSchema = {
	deviceID : String,
	points : Number
};

var Score = mongoose.model("Score", ScoreSchema, "Scores");

module.exports = Score;