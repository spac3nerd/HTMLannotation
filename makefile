#creates the folders needed by the build process
createFolders:
	mkdir -p frontEnd/lib;
	
downloadLibs: createFolders
	curl -L https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js > frontEnd/lib/jquery.js;
	curl -L https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js > frontEnd/lib/jquery-ui.min.js;
	curl -L https://cdnjs.cloudflare.com/ajax/libs/jquery.ui-contextmenu/1.18.1/jquery.ui-contextmenu.min.js >frontEnd/lib/jquery-ui-contextmenu.js;
	curl -L https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.6/angular.js > frontEnd/lib/angular.js;
	curl -L https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-core.js > frontEnd/lib/rangy-core.js;
	curl -L https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-classapplier.js > frontEnd/lib/rangy-classapplier.js;
	curl -L https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-highlighter.js > frontEnd/lib/rangy-highlighter.js;
	curl -L https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-serializer.js > frontEnd/lib/rangy-serializer.js;
	curl -L https://cdnjs.cloudflare.com/ajax/libs/rangy/1.3.0/rangy-selectionsaverestore.js > frontEnd/lib/rangy-selectionsaverestore.js;
	
	curl -L https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css > frontEnd/css/jqueryui.css
	
install: downloadLibs
	#build the frontEnd
	cd ./frontEnd; \
	npm install; \
	sudo npm install -g grunt-cli; \
	grunt; 
	#build the backEnd
	cd ./backEnd; \
	npm install; \
