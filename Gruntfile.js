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
					//expand: true,
					src: '<%= dirs.src %>/index.md',
					dest: '<%= dirs.dest %>/index.html',
					//ext: '.html'
				}]
			}
		},
		watch: {
			files: ['<%= dirs.src %>/*.md'],
			tasks: ['gen_markdown']
		}
	});

	// Load grunt plugins.
	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('gen_markdown', ['markdown']);
};
