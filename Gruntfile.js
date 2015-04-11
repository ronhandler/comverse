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
		connect: {
		  server: {
			options: {
			  port: 8000,
			  base: '.'
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
				src: ['<%= dirs.dest %>/index.html']
			}
		},
		watch: {
			files: ['<%= dirs.src %>/outline.md', 'index.html'],
			options: {
				livereload: 35729,
			},
			tasks: ['markdown', 'validation']
		}
	});

	// Load grunt plugins.
	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task.
	grunt.registerTask('default', ['connect', 'watch']);
};
