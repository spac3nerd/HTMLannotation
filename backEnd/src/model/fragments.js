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
				annotations: []
			};
		});
	});
};

function getColors () {
	return annotationColors;
};

function getAllFrags() {
	return fragments;
};

function getFragById(id) {
	return fragments[id];
};

function addAnnotation(id, ann) {
	if (fragments[id]) {
		if (ann.hasOwnProperty("selection") && ann.hasOwnProperty("annotation")) {
			ann.annotation.id = fragments[id].annotations.length || 0;
			fragments[id].annotations.push(ann);
			return ann;
		}
		else {
			return false;
		}
	}
	else { 
		return false;
	}
};

function deleteAnnotation(fragId, selId) {
	
	if (fragments[fragId]) {
		for (var k in fragments[fragId].annotations) {
			if (fragments[fragId].annotations[k].annotation.id === selId) {
				var sel = fragments[fragId].annotations[k].selection;
				fragments[fragId].annotations.splice(k, 1);
				console.log(fragments[fragId].annotations);
				return {
					fragment: fragments[fragId]
				}
			}
		}
		return false;
	}
	else {
		return false;
	}
}

module.exports = {initFragments, getAllFrags, getFragById, addAnnotation, deleteAnnotation};
