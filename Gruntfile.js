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
          styles: 'app/css/main.css',
          helpers: 'test/js/helper.js',
          vendor: [
            'app/lib/jquery/jquery.min.js',
            'app/lib/underscore/underscore-min.js',
            'app/lib/backbone/backbone-min.js',
            ],
          keepRunner: true,
        }
      }
    },

    uglify: {
      js: {
        files: {
          'dist/js/main.js': ['app/js/*.js'],
        }
      }
    },

    watch: {
      scripts: {
        files: ['app/js/*.js', 'test/js/*.js', 'Gruntfile.js'],
        tasks: ['jasmine', 'uglify'],
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['connect']);

};
