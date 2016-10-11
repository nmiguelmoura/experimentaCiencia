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
                    'www/css/indexStyle.css':'www/css/sass/index-style.scss',
                    'www/css/contentStyle.css':'www/css/sass/content-page-style.scss'
                }
            }
        },
        uglify:{
            options:{
                banner:'/*Created by Nuno Machado*/\n'
            },
            build:{
                files:{
                    'www/src/build/main.min.js':[
                        'www/src/Alerts.js',
                        'www/src/PopupBar.js',
                        'www/src/Main.js'
                    ]
                }
            }
        },
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [
                        {
                            name:'big_@2x',
                            width: 1306,
                            quality:60
                            //suffix: 'small'
                        },
                        {
                            name:'big',
                            width: 653,
                            quality:60
                        },
                        {
                            name:'medium_@2x',
                            width: 964,
                            quality:30
                        },
                        {
                            name:'medium',
                            width: 482,
                            quality:30
                        },
                        {
                            name:'small_@2x',
                            width: 708,
                            quality:30
                        },
                        {
                            name:'small',
                            width: 354,
                            quality:30
                        }
                    ]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'www/assets_or/',
                    dest: 'www/assets/index'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-responsive-images');
    grunt.registerTask('default',['sass','uglify'/*,'responsive_images'*/]);
};