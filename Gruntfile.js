module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			src: 'src',
			dest: './',
			img: 'img'
		},
		markdown: {
			all: {
				files: [{
					src: '<%= dirs.src %>/outline.md',
					dest: '<%= dirs.dest %>/outline.html',
				}]
			}
		},
		express: {
			all: {
				options: {
					bases: ['.'],
					port: 8080,
					hostname: "0.0.0.0",
					livereload: true
				}
			}
		},
		validation: {
			options: {
				reset: grunt.option('reset') || false,
				stoponerror: false,
				relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'] //ignores these errors 
			},
			files: {
				src: ['<%= dirs.dest %>/*.html']
			}
		},
		watch: {
			files: ['<%= dirs.src %>/outline.md'],
			options: {
				livereload: true
			},
			tasks: ['gen_markdown']
		}
	});

	// Load grunt plugins.
	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-html-validation');

	// Default task.
	grunt.registerTask('default', ['start_webserver', 'watch']);
	grunt.registerTask('gen_markdown', ['markdown']);
	grunt.registerTask('start_webserver', ['validation', 'express']);
};
