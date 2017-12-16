htmlAnn.directive("dynamic", function($compile) {
	console.log("initdir");
	var originalHTML;
	return {
		restrict: "A",
		replace: true,
		link: function(scope, elem, attr) {
			scope.changeAction = attr.trg;
			scope.$watch(attr.src, function(html) {
				console.log("initdidid");
				if (html) {
					originalHTML = html;
					console.log("dir");
					elem.html(html);
					$compile(elem.contents())(scope);
					scope.$eval(scope.changeAction);
				}
			});
			scope.$watch(attr.reload, function(val) {
				elem.html(originalHTML);
				$compile(elem.contents())(scope);
				console.log("reload");
			});
		}
	};
});
