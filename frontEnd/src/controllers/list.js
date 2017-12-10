 
htmlAnn.controller("listController", function ($rootScope, $scope, fragmentService) {
	$scope.fragments = {};
	fragmentService.getAllFrags().then(function(data) {
		$scope.fragments = data;
	});
	
	$scope.selectFragment = function(key, val) {
		$rootScope.$broadcast("fragmentChanged", key, val);
	};
});
