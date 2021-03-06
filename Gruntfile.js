// Generated on 2014-07-20 using generator-html5-app 0.0.3
"use strict";

// # Globbing
// for performance reasons we"re only matching one level down:
// "test/spec/{,*/}*.js"
// use this if you want to recursively match all subfolders:
// "test/spec/**/*.js"

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require("load-grunt-tasks")(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require("time-grunt")(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

		// Project settings
		yeoman: {
			// Configurable paths
			app: "app",
			dist: "dist"
		},

        ftpush: {
            build: {
                auth: {
                    host: 'isp.alpha-q.de',
                    port: 21,
                    authKey: 'alphaq'
                },
                src: 'dist',
                dest: 'html/johannesreuter',
                exclusions: [],
                keep: [],
            }
        },

        sprite:{
            skills: {
                src: '<%= yeoman.app %>/sprites/skills/*.png',
                dest: '<%= yeoman.app %>/img/skills.png',
                destCss: '<%= yeoman.app %>/styles/skills_sprites.css',
		cssVarMap: function(sprite) {
			sprite.name = 'skill-' + sprite.name;
		}
            }
        },

        less: {
            all: {
                options: {
                    paths: ["<%= yeoman.app %>/styles"]
                },
                files: {
                    "<%= yeoman.app %>/styles/main.css": "<%= yeoman.app %>/styles/main.less"
                }
            }
        },
	fontello: {
	    dist: {
	      options: {
	      	  config: 'fontello-config.json',
		  fonts   : 'app/font',
		  styles  : 'app/styles',
		  exclude: ['animation.css', 'fontello-ie7.css', 'fontello-ie7-codes.css', 'fontello.eot'],
	      }
	    }
	},
		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ["<%= yeoman.app %>/scripts/{,*/}*.js"],
				tasks: ["jshint", "notify:js"],
				options: {
					livereload: true
				}
			},
			jstest: {
				files: ["test/spec/{,*/}*.js"],
				tasks: ["test:watch"]
			},
            fontello: {
				files: ["fontello-config.json"],
				tasks: ["fontello"]
			},
            hbs: {
				files: ["<%= yeoman.app %>/{,*/}*.hbs", "<%= yeoman.app %>/{,*/}*.json"],
				tasks: ["compile-handlebars", "notify:hbs"]
			},
			gruntfile: {
				files: ["Gruntfile.js"]
			},
            less: {
				files: ["<%= yeoman.app %>/styles/{,*/}*.less"],
				tasks: ["less", "newer:copy:styles", "autoprefixer", "notify:css"]
			},
            spriteimgs: {
                files: ["<%= yeoman.app %>/img/{,*/}*.{gif,jpeg,jpg,png,svg,webp}"],
                tasks: ["responsive_images", "sprite", "notify:sprite"]
            },
			livereload: {
				options: {
					livereload: "<%= connect.options.livereload %>"
				},
				files: [
					"<%= yeoman.app %>/{,*/}*.html",
					".tmp/styles/{,*/}*.css",
					"<%= yeoman.app %>/img/{,*/}*.{gif,jpeg,jpg,png,svg,webp}"
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// Change this to "0.0.0.0" to access the server from outside
				hostname: "localhost"
			},
			livereload: {
				options: {
					open: true,
					base: [
						".tmp",
						"<%= yeoman.app %>"
					]
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
						".tmp",
						"test",
						"<%= yeoman.app %>"
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: "<%= yeoman.dist %>",
					livereload: false
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						".tmp",
						"<%= yeoman.dist %>/*",
						"!<%= yeoman.dist %>/.git*"
					]
				}]
			},
			server: ".tmp"
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: ".jshintrc",
				reporter: require("jshint-stylish")
			},
			all: [
				"<%= yeoman.app %>/scripts/{,*/}*.js"
			]
		},

        'compile-handlebars': {
            globbedTemplateAndOutput: {
                template: './app/index.hbs',
                templateData: './app/data.json',
                output: './app/index.html',
                partials: './app/partials/*.hbs',
                helpers: './app/helpers/*.js'
            }
        },

		notify: {
		    css: {
			options: {
			    title: '<%= pkg.name %>',
			    message: 'CSS ready'
			}
		    },
		    js: {
			options: {
			    title: '<%= pkg.name %>',
			    message: 'JavaScript ready'
			}
		    },
            hbs: {
			options: {
			    title: '<%= pkg.name %>',
			    message: 'Handlebars-Templates ready'
			}
		    },
            sprite: {
			options: {
			    title: '<%= pkg.name %>',
			    message: 'Generated Sprites ready'
			}
		    },
		    dev: {
			options: {
			    title: '<%= pkg.name %>',
			    message: 'Grunt has created development environment'
			}
		    },
		    all: {
			options: {
			    title: '<%= pkg.name %>',
			    message: 'Grunt build all for a Release'
			}
		    }
		},
		notify_hooks: {
		    options: {
			enabled: true,
			max_jshint_notifications: 5,
			title: '<%= pkg.name %>'
		    }
		},




		// Add vendor-prefixed styles
		autoprefixer: {
			options: {
				browsers: ["last 1 version"]
			},
			dist: {
				files: [{
					expand: true,
					cwd: ".tmp/styles/",
					src: "{,*/}*.css",
					dest: ".tmp/styles/"
				}]
			}
		},
		// Automatically inject Bower components into the HTML file
		"bower-install": {
			app: {
				html: "<%= yeoman.app %>/index.html",
				ignorePath: "<%= yeoman.app %>/"
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						"<%= yeoman.dist %>/scripts/{,*/}*.js",
						"<%= yeoman.dist %>/styles/{,*/}*.css",
						"<%= yeoman.dist %>/styles/fonts/{,*/}*.*"
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: "<%= yeoman.dist %>"
			},
			html: "<%= yeoman.app %>/index.html"
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
                basedir: "<%= yeoman.dist %>",
				assetsDirs: ["<%= yeoman.dist %>"]
			},
			html: ["<%= yeoman.dist %>/{,*/}*.html"],
			css: ["<%= yeoman.dist %>/styles/{,*/}*.css"]
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: "<%= yeoman.app %>/img",
					src: "{,*/}*.{gif,jpeg,jpg,png}",
					dest: "<%= yeoman.dist %>/img"
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: "<%= yeoman.app %>/img",
					src: "{,*/}*.svg",
					dest: "<%= yeoman.dist %>/img"
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: "<%= yeoman.dist %>",
					src: "{,*/}*.html",
					dest: "<%= yeoman.dist %>"
				}]
			}
		},

		responsive_images: {
			projects: {
				options: {
					sizes: [{
						name: 'small',
						width: 120
					},{
						name: 'medium',
						width: 320
					},{
						name: "large",
						width: 500
					}]
				},
				files: [{
					expand: true,
					src: ['app/img/projects/!(*-*).{jpg,gif,png}'],
					dest: '.'
				}]
			}
		},

		// By default, your `index.html`"s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//	 dist: {
		//		 files: {
		//			 "<%= yeoman.dist %>/styles/main.css": [
		//				 ".tmp/styles/{,*/}*.css",
		//				 "<%= yeoman.app %>/styles/{,*/}*.css"
		//			 ]
		//		 }
		//	 }
		// },
		// uglify: {
		//	 dist: {
		//		 files: {
		//			 "<%= yeoman.dist %>/scripts/scripts.js": [
		//				 "<%= yeoman.dist %>/scripts/scripts.js"
		//			 ]
		//		 }
		//	 }
		// },
		// concat: {
		//	 dist: {}
		// },

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: "<%= yeoman.app %>",
					dest: "<%= yeoman.dist %>",
					src: [
						"*.{ico,png,txt}",
						".htaccess",
						"img/{,*/}*.webp",
						"{,*/}*.html",
						"styles/fonts/{,*/}*.*",
						"bower_components/" + (this.includeCompass ? "sass-" : "") + (this.includeCompass ? "fonts/" : "dist/fonts/") +"*.*"
					]
				},
                {
					expand: true,
					dest: "<%= yeoman.dist %>/font/",
                    flatten: true,
					src: [
                        "<%= yeoman.app %>/font/*.*",
					]
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: "<%= yeoman.app %>/styles",
				dest: ".tmp/styles/",
				src: "{,*/}*.css"
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				"copy:styles"
			],
			test: [
				"copy:styles"
			],
			dist: [
				"copy:styles",
				"imagemin",
				"svgmin"
			]
		}
	});


	grunt.registerTask("serve", function (target) {
		if (target === "dist") {
			return grunt.task.run(["build", "connect:dist:keepalive"]);
		}

		grunt.task.run([
			"clean:server",
			"sprite",
			"less",
			"fontello",
			"responsive_images",
			"concurrent:server",
			"compile-handlebars",
			"autoprefixer",
			"connect:livereload",
			"notify:dev",
			"watch"
		]);
	});

	grunt.registerTask("server", function () {
		grunt.log.warn("The `server` task has been deprecated. Use `grunt serve` to start a server.");
		grunt.task.run(["serve"]);
	});

	grunt.registerTask("test", function(target) {
		if (target !== "watch") {
			grunt.task.run([
				"clean:server",
				"concurrent:test",
				"autoprefixer",
			]);
		}

		grunt.task.run([
			"connect:test",
		]);
	});

	grunt.registerTask("build", [
		"clean",
		"sprite",
		"less",
		"responsive_images",
		"fontello",
		"useminPrepare",
		"concurrent:dist",
		"compile-handlebars",
		"autoprefixer",
		"concat",
		"cssmin",
		"uglify",
		"copy:dist",
		"rev",
		"usemin",
		"htmlmin",
	]);

    grunt.registerTask("deploy", [
         "build",
         "ftpush"
    ]);

	grunt.registerTask("default", [
		"newer:jshint",
		"test",
		"build"
	]);
};
