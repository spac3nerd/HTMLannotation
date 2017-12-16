To install the needed dependencies, simply go to the root directory and run:
	$ make install 

To run the server, navigate to /backEnd and run:
	$node init.js
	
That's it, navigate to the IP address and port combination with a web browser. The default port is 8080.
The server configuration options are available in backEnd/init.js. 

******
To add a new article, simply create a new file in backEnd/fragments, and place the HTML source for the article there. Once the server is restarted, 
the data structure associated with the article will be automatically created. 
