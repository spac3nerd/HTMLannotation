htmlAnn.service("fragmentService", function($q, $http) {
	var addr = window.location.href;
	this.getAllFrags = function() {
		return $http.get("/fragment/getAll").then(function(res) {
			return res.data;
		});
	};
});
