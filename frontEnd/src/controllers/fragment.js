 
htmlAnn.controller("fragmentController", function ($scope, $element, fragmentService) {
	var activeFrag = {};
	var selID;
	var highlighter;
	$scope.activated = false;
	$scope.annotationText = "Add Annotation";
	//hardcode the annotation colors
	$scope.annotationColors = {
		Yellow: "highlight1",
		Blue: "highlight2",
		Red: "highlight3",
		Gray: "highlight4",
		Brown: "highlight5",
		Purple: "highlight6",
		Green: "highlight7",
		Black: "highlight8"
	};
	$scope.selectedColor = "Yellow";
	
	
	
	function switchFrag(key, val) {
		activeFrag.id = key;
		activeFrag.content = val;
		console.log(activeFrag);
		$scope.html = val.content;
		$scope.activated = true;
	}
	
	function reloadFrag() {
		$scope.reloadDynamicContainer = $scope.reloadDynamicContainer ? !$scope.reloadDynamicContainer : true;
		setTimeout(function() {
			initRangy();
		}, 200);
	}
	
	function initRangy() {
		rangy.init();
		
		//create the color drop down
		$("#colorSelect").on("change", function(e, ui) {
			$scope.selectedColor = $("#colorSelect").val();
			$scope.$apply();
		});
		
		//apply any existing annotations
		for (var k = 0; k < activeFrag.content.annotations.length; k++) {
			
			var deserialized = rangy.deserializeSelection(activeFrag.content.annotations[k].selection, $("#dynamicCont")[0]);
			highlight = rangy.createClassApplier($scope.annotationColors[activeFrag.content.annotations[k].annotation.color], {
				elementAttributes: {
					id: "sel-" + k
				}
			});
			highlight.toggleSelection();
		}
		window.getSelection().removeAllRanges();
	}
	
	function showSelectedAnn(id) {
		id = Number(id.split("-")[1]);
		var annData;
		for (var k in activeFrag.content.annotations) {
			if (activeFrag.content.annotations[k].annotation.id === id) {
				annData = activeFrag.content.annotations[k].annotation;
				continue;
			}
		}
		var textarea = $("#annotationArea");
		$(textarea).val(annData.text);
		$scope.annotationText = "Delete Annotation";
		selID = id;
	}
	
	$scope.$on("fragmentChanged", function(e, key, val) {
		if (key !== activeFrag.id) {
			switchFrag(key, val);
		}
	});
	
	//triggered once a click is made on the fragment content
	$scope.didSelectContent = function() {
		$scope.annotationText = "Add Annotation";
		var sel = window.getSelection();
		//selecting an existing annotation only happens on a click without a visible selection
		if (sel.rangeCount !== 1) {
			return;
		}
		//get the element which contains the selected text
		var parent = sel.anchorNode.parentElement;
		//check if it contains our selection
		if (parent.tagName === "SPAN") {
			showSelectedAnn(parent.id);
		}
	};
	
	$scope.editAnnotation = function(e) {
		if ($scope.annotationText === "Add Annotation") {
			var sel = rangy.getSelection();
			//check that a selection is made
			if (sel.focusNode) {
				var textarea = $("#annotationArea");
				if (textarea.val() === "") {
					alert("Enter an annotation");
					return;
				}
				fragmentService.addAnnotation(activeFrag.id, {
					selection: rangy.serializeSelection(sel, true, $("#dynamicCont")[0]),
					annotation: {
						text: textarea.val(),
						color: $scope.selectedColor
					}
				}, function(res) {
					activeFrag.content.annotations.push(res.data);
					highlight = rangy.createClassApplier($scope.annotationColors[res.data.annotation.color], {
						elementAttributes: {
							id: "sel-" + res.data.annotation.id
						}
					});
					highlight.toggleSelection();
				});
			}
			else {
				alert("Please make a text selection fist");
			}
		}
		else {
			fragmentService.deleteAnnotation(activeFrag.id, selID, function(res) {
				if (res.success) {
					activeFrag.content = res.data.fragment;
					reloadFrag();
					$scope.annotationText = "Add Annotation";
				}
			});
		}
	};
	
	//called once the new fragment has been compiled
	$scope.contentChanged = function(e) {
		initRangy();
	};
});
