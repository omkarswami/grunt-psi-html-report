/*
 * grunt-psi-html-report
 * https://github.com/omkarswami/grunt-psi-html-report
 *
 * Copyright (c) 2018 Omkar Swami
 * Licensed under the MIT license.
 */

'use strict';
const arrayProcessor = require('./src/array-processor');
const htmlGenerator = require('./src/html-generator');
module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('psi_html_report', "Creates html report of Google's PageSpeed Insights scores for multiple urls.", function () {
    //console.log(JSON.stringify(this));
    //Tells grunt that the task is async
    this.async();
    var self = this;
    var processPSI = arrayProcessor.processFile(self.data.options.urls);
      
    processPSI.then(function () {
      console.log("PAGESPEED EXECUTION COMPLETE..");
      console.log("GENERATING HTML REPORT..");
      //GENERATE HTML REPORT
      htmlGenerator.generateHTML();
    }).catch(function (error) {
      console.log("PAGESPEED EXECUTION FAILED..", error);
    });
  });
};
