htmlAnn.directive("dynamic", function($compile) {
	console.log("initdir");
	return {
		restrict: "A",
		replace: true,
		link: function(scope, elem, attr) {
			scope.changeAction = attr.trg;
			scope.$watch(attr.src, function(html) {
				if (!html) {
					return;
				}
				elem.html(html);
				$compile(elem.contents())(scope);
				scope.$eval(scope.changeAction);
			});
		}
	};
});
