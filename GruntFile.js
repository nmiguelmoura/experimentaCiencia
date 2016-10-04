module.exports=function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('./package.json'),
        sass:{
            dist:{
                options:{
                    style:'compressed',
                    sourcemap:'none'
                },
                files:{
                    'www/css/indexStyle.css':'www/css/sass/index-style.scss'
                }
            }
        },
        uglify:{
            options:{
                banner:'/*Created by Nuno Machado*/\n'
            },
            build:{
                files:{

                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default',['sass','uglify']);
};