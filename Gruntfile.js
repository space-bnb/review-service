const { upload } = require('./utils/s3upload');

module.exports = function(grunt) {

  grunt.registerTask('s3', function() {
      let done = this.async();
      setTimeout(function () {
        upload().then(() => done());
    }, 5000);
  });
};