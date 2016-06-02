/*-----------------------------------------------------
 * livereload Default Setting
 *-----------------------------------------------------*/
'use strict';
var path = require('path');
var os = require('os');

/*-----------------------------------------------------
 * Module Setting
 *-----------------------------------------------------*/
module.exports = function(grunt) {
    // require('load-grunt-tasks')(grunt);
    require('load-grunt-tasks')(grunt);

    var banner = '/*!\n' +
        ' * ====================================================\n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.description ? " * " + pkg.description + "\\n" : "" %>\n' +
        ' * <%= pkg.httppage ? " * " + pkg.httppage + "\\n" : "" %>\n' +
        ' * Github:<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%=pkg.licenses %>\n' +
        ' * ====================================================\n' +
        ' */\n\n';
    var distPath = os.hostname().indexOf('ubuntu')>=0?'/home/ubuntu/www/wireless/':'dist/';
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg: pkg,
        clean:["dist"],
        uglify: {
            minimize: {
                options: {
                    banner: banner,
                    sourceMap: false
                },
                files:(function(){
                    var a= {};
                    a[distPath+"script.min.js"] = distPath+"script.js"
                    return a;
                })()
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: ['ui/**/*','index.html','static/**/*',"lib/bower/bootstrap/dist/css/bootstrap.min.css","lib/bower/bootstrap/dist/js/bootstrap.js","lib/bower/jquery/dist/jquery.js"],
                    dest: distPath

                }]
            },
            mise: {
                files: [{
                    src: ['LICENSE','favicon.png'],
                    dest: distPath
                }]
            }
        },
        replace:{
            online: {
                src: distPath+"index.html",
                overwrite: true,
                replacements: [{
                    from: /\"lib\/bower\/requirejs\/require\.js\"/,
                    to: '"script.min.js"'
                }]
            },
             pageNoCache: {
                src: distPath+"index.html",
                overwrite: true,
                replacements: [{
                    from: /(src|href)=\"(.+?)\.(js|css)\"/ig,
                    to: '$1="$2.$3?_=' + (+new Date()) + '"'
                }]
            },
            imageNoCache: {
                src: distPath+'ui/css/index.css',
                overwrite: true,
                replacements: [{
                    from: /\.png/ig,
                    to: '.png?_=' + (+new Date())
                }]
            }
        },
        requirejs:{
            compile:{
                options:{
                    banner:banner,
                    include: ['../lib/bower/requirejs/require','index'],// ['../lib/bower/requirejs/require','index'],
                    mainConfigFile:"src/index.js",
                    baseUrl: "src",
                    optimize:'none',
                    out: distPath+'script.js'
                }
            }
        },
        wiredep: {
            dev: {
                src: ['index.html'],
        	    devDependencies: true
            },
            dist:{
                src:['/dist/index.html']
            }

        }
    });
    grunt.registerTask('default', ['clean',"requirejs","uglify","copy","replace"]);
};
