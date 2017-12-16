htmlAnn.service("fragmentService", function($q, $http) {
	var addr = window.location.href;
	this.getAllFrags = function() {
		return $http.get("/fragment/getAll").then(function(res) {
			return res.data;
		});
	};
	this.addAnnotation = function(id, data, callback) {
		return $http.post("/fragment/addAnnotation", JSON.stringify({fragId: id, ann: data}), {
			"Content-Type": "application/json"
		}).then(function(res) {
			if (callback) {
				callback(res.data);
			}
		});
	};
	this.deleteAnnotation = function(fragId, selId, callback) {
		return $http.post("/fragment/deleteAnnotation", JSON.stringify({fragId: fragId, selId: selId}), {
			"Content-Type": "application/json"
		}).then(function(res) {
			if (callback) {
				callback(res.data);
			}
		});
	};
	
});
