"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        meta: {
            banner: '\n/*\n * <%= pkg.name %> v<%= pkg.version %> - ' +
                '<%= grunt.template.today("dd.mm.yyyy") %>\n' +
                ' * \n' +
                ' * <%= pkg.homepage %>\n' +
                ' */\n\n'
        },

        // generates demo/app.css
        less: {
            dist: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                        new (require("less-plugin-clean-css"))()
                    ],
                    paths: [
                        "node_modules/shariff/src/style",
                        "node_modules/font-awesome/less"
                    ],

                    // Override font path
                    modifyVars: {
                        "fa-font-path": "'/fonts'"
                    }
                },
                src: "src/app.less",
                dest: "demo/app.css"
            }
        },

        // generates demo/app.min.js
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["uglifyify", {global: true}]
                    ],
                    browserifyOptions: {
                        fullPaths: false
                    },
                    banner: "<%= meta.banner %>"
                },
                src: "src/app.js",
                dest: "demo/app.min.js"
            }
        },

        watch: {
            less: {
                files: "<%= less.dist.src %>",
                tasks: ["less"],
            },
            js: {
                files: ["<%= browserify.dist.src %>"],
                tasks: ["browserify"],
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["browserify", "less"]);
};
