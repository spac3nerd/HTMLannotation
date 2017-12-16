 
var express = require("express");
var router = express.Router();
var fragmentModel = require("../model/fragments.js");


//Retreive all of the fragments
router.get("/fragment/getAll", function(req, res) {
	var packet = fragmentModel.getAllFrags();
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end(JSON.stringify(packet), "utf-8");
});

function getModelPacket(modelRes) {
	if (modelRes != false) {
		packet = {
			success: true,
			data: modelRes
		}
	}
	else {
		packet = {
			success: false
		}
	}
	return packet;
};

function send200Res(packet, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end(JSON.stringify(packet), "utf-8");
};

router.post("/fragment/addAnnotation", function(req, res) {
	//var packet = {};
	var packet = getModelPacket(fragmentModel.addAnnotation(req.body.fragId, req.body.ann));
	/*
	var modelRes = fragmentModel.addAnnotation(req.body.fragId, req.body.ann);
	if (modelRes != false) {
		packet = {
			success: true,
			data: modelRes
		}
	}
	else {
		packet = {
			success: false
		}
	}
	*/
	send200Res(packet, res);
	//res.writeHead(200, {"Content-Type": "text/plain"});
	//res.end(JSON.stringify(packet), "utf-8");
});

router.post("/fragment/deleteAnnotation", function(req, res) {
	//var packet = {};
	var packet = getModelPacket(fragmentModel.deleteAnnotation(req.body.fragId, req.body.selId));
	//var modelRes = fragmentModel.deleteAnnotation(req.body.fragId, req.body.selId);
	/*
	if (modelRes != false) {
		packet = {
			success: true,
			data: modelRes
		}
	}
	else {
		packet = {
			success: false
		}
	}
	*/
	send200Res(packet, res);
	//res.writeHead(200, {"Content-Type": "text/plain"});
	//res.end(JSON.stringify(packet), "utf-8");
});

module.exports = router;
