function webAppServer(settings) {
	var bodyParser = require("body-parser");
	var fs = require("fs");
	var express = require("express");
	var http = require("http");
	
	
	var app = express();
	
	//bring in the routes
	var fragmentRoutes = require("../routes/fragment.js");
	
	//tell Express to use the routes
	app.use(fragmentRoutes);
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(express.static(settings.resources)); //static resources
	
	//request for the home page
	app.get("/", function(req, res) {
		res.sendFile(settings.indexPage);
	});
	
	var httpServer = http.createServer(app).listen(settings.httpPort);
	console.log("Server is listening on port " + settings.httpPort);
}

module.exports = webAppServer;
