#creates the folders needed by the build process
createFolders:
	mkdir -p frontEnd/lib;
	
downloadLibs: createFolders
	curl -L https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.6/angularjs > frontEnd/lib/angular.js;
	
install: downloadLibs
	#build the frontEnd
	cd ./frontEnd; \
	npm install; \
	#sudo npm install -g grunt-cli; \
	#grunt; 
	#build the backEnd
	cd ./backEnd; \
	npm install; \
	cd ..; \
