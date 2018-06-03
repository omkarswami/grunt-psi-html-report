/*
 * grunt-psi-html-report
 * https://github.com/omkarswami/grunt-psi-html-report
 *
 * Copyright (c) 2018 Omkar Swami
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run.
    psi_html_report: {
      default_options: {
        options: {
          urls:["https://www.youtube.com","https://www.twitter.com"]
        }, 
      }
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask( ['clean', 'psi_html_report']);


};
