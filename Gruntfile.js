module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    jasmine: {
      all: {
        src: 'app/js/*.js',
        options: {
          specs: 'test/js/*Spec.js',
          vendor: [
            'app/js/lib/jquery/jquery.min.js',
            'app/js/lib/underscore/underscore-min.js',
            'app/js/lib/backbone/backbone-min.js',
            ],
          keepRunner: true,
        }
      }
    },

    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['jasmine'],
        options: {
          interrupt: true,
        },
      },
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'app',
          keepalive: true,
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['connect']);

};
