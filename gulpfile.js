/**
 * Created by Administrator on 2017/1/8.
 */
'use strict';
/**
 * 1.用less 编译压缩合并
 * 2.js合并 压缩 混淆
 * 3.img复制
 * 4.html压缩
 */

//在gulpfile中先载入gulp的包，因为有这个包才能做想对应的工作

var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
//1.用less 编译压缩合并

gulp.task('style', function () {
    //这里是在执行style的任务时自动执行的
    //建立src文件下面建立index.html文件
    gulp.src(['src/style/*.less', '!src/style/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload({
                stream: true
            }
        ));
})

//2.js合并 压缩 混淆

var concat = require('gulp-concat');//表示合并的意思
var uglify = require('gulp-uglify');//表示混淆的意思
gulp.task('script', function () {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
                stream: true
            }
        ));
})

//3.img复制

gulp.task('images', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
                stream: true
            }
        ));
})

//4.html压缩

var htmlmin = require('gulp-htmlmin');
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')//压缩html
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
                stream: true
            }
        ));
})

var browserSync = require('browser-sync');

// 静态服务器
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    }, function (err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('src/style/*.less', ['style']);
    gulp.watch('src/scripts/*.js', ['script']);
    gulp.watch('src/images/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);
});
