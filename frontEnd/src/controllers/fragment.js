 
htmlAnn.controller("fragmentController", function ($scope, $element, fragmentService) {
	var activeFrag = {};
	
	function switchFrag(key, val) {
		activeFrag.id = key;
		activeFrag.content = val;
		console.log(val.content);
		$scope.html = val.content;
	}
	
	function initRangy() {
		console.log($scope);
		console.log($element);
	}
	$scope.$on("fragmentChanged", function(e, key, val) {
		if (key !== activeFrag.id) {
			switchFrag(key, val);
		}
	});
	
	$scope.contentChanged = function(e) {
		console.log(activeFrag);
		initRangy();
	};

});
