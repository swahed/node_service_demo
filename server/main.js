const express = require("express");
const server = new express();
const parser = require("body-parser");

const dbModule = require("./database.js");
const db = dbModule.connect("node_service_demo");

server.get("/", function(req, res) {	
	var viewModel = { message : "The simplest game in the world!" };
	res.render('./../app/index.ejs', viewModel);
})
.use(express.static(__dirname + "/../app"))
.use(express.static(__dirname + "/../.tmp"))
.listen(7777);

server.use(parser.json());
server.use(parser.urlencoded({extended:false}));

require("./routes/scores.js")(server);