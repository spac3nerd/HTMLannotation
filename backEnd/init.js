var webAppServer = require("./src/server/server.js");
var fragmentModel = require("./src/model/fragments.js");
var server;

var serverOptions = {
	baseURL: global.baseURL,
	httpPort: 8082,
	resources: __dirname + "/public", //absolute path must be provided
	indexPage: __dirname + "/public/html/index.html",
	fragments: __dirname + "/fragments"
};

global.baseURL = "http://localhost" + ":" + serverOptions.httpPort;

var apiOptions = {
	address: "http://localhost:8081"
};

function init() {
	fragmentModel.initFragments(serverOptions.fragments);
	server = new webAppServer(serverOptions);
};
init();
