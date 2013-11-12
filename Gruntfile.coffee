module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    coffee:
      compile:
        expand: true
        src: ["tic.coffee", "ticSpec.coffee"]
        ext: ".js"
    watch:
      scripts:
        files: ["src/*.coffee"]
        tasks: ["coffee"]
        options:
          spawn: false
    jasmine:
      std:
        src: "src/**/*.js"
        options:
          specs: "*Spec.js"
          helpers: "*Helper.js"

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-jasmine"

  grunt.registerTask "default", ["coffee"]