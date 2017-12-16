module.exports = function(grunt) {
	//The directory into which resources will be sent
	var dest = "../backEnd/public/";
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		jshint: {
			options:{
				laxcomma: true,
				smarttabs: true,
				debug: true,
				expr: true,
				loopfunc: true
			},
			all: [
				"src/**/*.js"
			]
		},
		
		concat: {
			options: {
				separator: "\n"
			},
			dist: {
				src: [
					"lib/angular.js",
					"lib/jquery.js",
					"lib/jquery-ui.min.js",
					"lib/jquery-ui-contextmenu.js",
					"lib/rangy-core.js",
					"lib/rangy-classapplier.js",
					"lib/rangy-highlighter.js",
					"lib/rangy-serializer.js",
					"lib/rangy-selectionsaverestore.js",
					"src/app.js",
					"src/services/fragment.js",
					"src/directives/dynamicContent.js",
					"src/controllers/list.js",
					"src/controllers/fragment.js"
				],
				dest: dest + "htmlAnn.js"
			}
		},
		concatcss: {
			options: {
				separator: "\n"
			},
			dist: {
				src: [
					"css/*.css"
				],
				dest: dest + "style.css"
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ["html/index.html"],
						dest: dest
					}
				]
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	
	grunt.registerTask("default", ["debug"]);
	grunt.registerTask("debug", ["concat", "concatcss", "copy", "jshint"]);
	
	grunt.registerTask("concatcss", function() {
		var task = grunt.config("concatcss");
		var src = task.dist.src;
		var dist = task.dist;
		var options = task.options;
		grunt.config.set("concat", {
			options: options,
			dist: dist
		})
		grunt.task.run("concat");
});
	
};
