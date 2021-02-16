const { upload, uploadDev } = require('./utils/s3upload');

module.exports = function(grunt) {

  grunt.registerTask('s3', function() {
    
    let done = this.async();
    upload();
    setTimeout(function () {
      done();
    }, 5000);
  });

  grunt.registerTask('s3-dev', function() {
    
    let done = this.async();
    uploadDev();
    setTimeout(function () {
      done();
    }, 5000);
  });

};