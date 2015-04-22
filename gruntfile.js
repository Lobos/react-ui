module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: require('./grunt/browserify'),
    less: require('./grunt/less'),
    jshint: require('./grunt/jshint'),
    uglify: require('./grunt/uglify'),
    watch: require('./grunt/watch'),
    copy: require('./grunt/copy'),

    mocha: {
      all: {
        src: ['test/index.html'],
      },
      options: {
        run: true
      }
    }
  })

  // load npm tasks
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-jsxhint')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-mocha')

  grunt.registerTask('publish', ['jshint:default', 'browserify:publish', 'uglify:publish', 'less:publish', 'copy:publish'])
  grunt.registerTask('docs', ['jshint:docs', 'browserify:docs', 'uglify:docs', 'less:docs', 'copy:docsHtml', 'copy:docsAssets'])
  grunt.registerTask('test', ['publish', 'mocha'])
}
