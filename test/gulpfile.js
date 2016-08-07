/**
 * Created by liuqingwei on 16/5/22.
 */
var gulp = require('gulp');
var connect = require('gulp-connect');//静态服务器
var livereload = require('gulp-livereload');

var less = require('gulp-less');//less编译
var concat = require("gulp-concat");//文件合并
//====解决less编译出错，管道崩溃的问题
var plumber = require('gulp-plumber');//Briefly it replaces pipe method and removes standard onerror handler on error event, which unpipes streams on error by default.
var notify = require('gulp-notify');//

//定义一个css名字
var cssName = 'test.css';
//默认任务
gulp.task('default', function() {
  // 测试一下
  console.log('this is a new test page.');
  gulp.watch(['less/*.less'],['less']);
  gulp.start('server');
});

//less
gulp.task('less',function(cb){
  return gulp.src('less/main.less')
    .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>;')}))
    .pipe(less())
    .pipe(concat(cssName))
    .pipe(gulp.dest('stylesheets/'))
    .pipe(livereload());
});
// //监视文件是否有变化
// gulp.task('watchAll',function(cb){
//   gulp.watch(['view/*.html'],['html']);
//   gulp.watch(['less/*less'],['less']);
// });
//启动服务器
gulp.task('watchHtml', function () {
  //创建watch任务去检测html文件，其定义了当html改动之后，去调用一个gulp的tesk
  gulp.watch(['view/*.html'],['html']);
});
//使用connect启动一个web服务器
gulp.task('connect', function () {
  connect.server({
    liverload: true,port:9876
  });
});
gulp.task('html', function () {
  //清除缓存
  gulp.src('*.html')
    .pipe(connect.reload());
});
gulp.task('server', ['connect', 'watchHtml']);
