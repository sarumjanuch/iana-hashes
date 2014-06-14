'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    'build/iana-hashes.bundle.js': ['<%= pkg.main %>']
                },
                options: {
                    bundleOptions: {
                        standalone: 'Hashes'
                    }
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! iana-hashes <%= grunt.template.today("yyyy-mm-dd") %>*/'
            },
            dist: {
                files: {
                    'build/iana-hashes.bundle.min.js': ['build/iana-hashes.bundle.js']
                }
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'index.js',
                'test/**.js'
            ],
            options: grunt.file.readJSON('.jshintrc')
        },
        tape: {
            options: {
                pretty: true
            },
            files: ['test/**.js']
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-tape');
    grunt.loadNpmTasks('grunt-nsp-package');

    grunt.registerTask('default', ['jshint', 'browserify', 'uglify', 'tape', 'validate-package']);
};
