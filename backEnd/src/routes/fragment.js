 
var express = require("express");
var router = express.Router();
var fragmentModel = require("../model/fragments.js");


//Retreive all of the fragments
router.get("/fragment/getAll", function(req, res) {
	var packet = fragmentModel.getAllFrags();
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end(JSON.stringify(packet), "utf-8");
});

router.post("/fragment/addAnnotation", function(req, res) {
	var packet = {};
	if (fragmentModel.addAnnotation(req.body.id, req.body.ann)) {
		packet = {
			success: true
		}
	}
	else {
		packet = {
			success: false
		}
	}
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end(JSON.stringify(packet), "utf-8");
});

module.exports = router;
