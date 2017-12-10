var fs = require("fs");
var crypto = require("crypto");
var fragments = {};

//Initialize the data strcuture for every HTML fragment in the given directory.
function initFragments(srcDir) {
	fs.readdir(srcDir, function(err, allFiles) {
		if (err) {
			console.error("Target direcotry " + srcDir + " is empty");
			process.exit();
		}
		allFiles.forEach(function(f, i) {
			fragments[crypto.randomBytes(24).toString("hex")] = {
				name: f.split(".").slice(0, -1).join("."),
				content: fs.readFileSync(srcDir + "/" + f, "utf8"),
				//path: srcDir + f,
				annotations: {}
			};
		});
		console.log(fragments);
	});
};

function getAllFrags() {
	return fragments;
};

function getFragById(id) {
	return fragments[id];
};

function addAnnotation(id, ann) {
	return true;
};

//function deleteAnnotation(id, 

module.exports = {initFragments, getAllFrags, getFragById, addAnnotation};
