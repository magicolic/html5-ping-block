module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jslint: { // https://npmjs.org/package/grunt-jslint / https://github.com/stephenmathieson/grunt-jslint
            app: {
                src: ['src/**/*.js'],
                directives: {
                    predef: ['console', 'alert', 
                             'enchant', 'Game', 'Label', 'Sprite',
                             'App', 'Levels', 'BarSprite', 'BallSprite', 'BlockSprite', 'StartScene', 'GameScene', 'GameOverScene', 'WonScene']
                }
            }
            //test: {
            //    src: ['test/**/*.js'],
            //    directives: {
            //        predef: ['test', 'ok']
            //    }
            //}
        },
        
        jshint: { // https://npmjs.org/package/grunt-contrib-jshint
            files: ['src/**/*.js', 'test/**/*.js']
        },
        
        uglify: { // https://npmjs.org/package/grunt-contrib-uglify
            my_target: {
                files: {
                    'build/app.min.js': ['src/**/*.js'],
                    'build/test.min.js': ['test/**/*.js']
                }
            }
        },
        
        qunit: { // https://npmjs.org/package/grunt-contrib-qunit
            all: ['test/*.html']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-jslint');
    
    grunt.registerTask('default', ['jslint', 'jshint', 'uglify', 'qunit']);
};
