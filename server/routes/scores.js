module.exports = function(server) {

	const Score = require('./../models/Score.js');

    server.route("/api/ranking").post(function(req, res) {
        if(!req.body) {
            res.status(500).send();
            return;
        }

        const score = req.body;

        Score.findOne({ deviceID: score.deviceID }, function(error, doc){
            if(doc) {
                doc.points = score.points;
            } else {
                doc = new Score(score);
            }

            doc.save(function(error, data) {
                if(error) console.log(error);
                getRanking(doc.deviceID, function(result){
                    res.status(200).send({ ranking : result });
                });
            });
        });         
	});
    /*.post(function(req, res) {
        // ...
    }).put(function(req, res) {
        // ...
    }).delete(function(req, res) {
        // ...
    }).patch(function(req, res) { 
        // ...
    };*/

     function getRanking(deviceID, callback) {
         Score.find().sort({ points: -1 }).exec(function(error, data) { 
            if(!data || data.length < 1) {
                return 0;   
            } else {
                const item = data.filter(function(d){
                    return d.deviceID === deviceID;
                })[0];               

                const index = data.indexOf(item) + 1;
                callback(index);
            }
        });
    }
}