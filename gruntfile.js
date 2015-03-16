module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: require('./grunt/browserify'),
    less: require('./grunt/less'),
    jshint: require('./grunt/jshint'),
    uglify: require('./grunt/uglify'),
    watch: require('./grunt/watch'),
    copy: require('./grunt/copy')
  })

  // load npm tasks
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-jsxhint')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('build', ['jshint', 'browserify', 'uglify', 'less', 'copy'])
}
