// Generated on 2016-03-20 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var karmaServer = require('karma').Server;
var amdOptimize = require('gulp-amd-optimize');
//var concat = require('gulp-concat');

var yeoman = {
  app: require('./bower.json').appPath || 'app',
  dist: '.dist'
};

var paths = {
  scripts: [yeoman.app + '/script/**/*.js'],
  styles: [yeoman.app + '/styles/**/*.scss'],
  test: ['test/spec/**/*.js'],
  testRequire: [
    yeoman.app + '/bower_components/angular/angular.js',
    yeoman.app + '/bower_components/angular-mocks/angular-mocks.js',
    yeoman.app + '/bower_components/angular-resource/angular-resource.js',
    yeoman.app + '/bower_components/angular-cookies/angular-cookies.js',
    yeoman.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    yeoman.app + '/bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'test/karma.conf.js',
  views: {
    main: yeoman.app + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.sass, {
    outputStyle: 'expanded',
    precision: 10
  })
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000
  });
});

gulp.task('start:server:test', function() {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    port: 9001
  });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(lintScripts());

  gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['start:client'],
    'watch', cb);
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 9000
  });
});

gulp.task('test', ['start:server:test'], function () {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

gulp.task('ktest', function (done) {
  new karmaServer({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: false
  }, function (err) {
    done(err);
  }).start();
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: yeoman.app + '/bower_components',
      ignorePath: '..'
    }))
  .pipe(gulp.dest(yeoman.app + '/views'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf('./.build', cb);
});

gulp.task('runAMDbuild', $.shell.task([
      'node r.js -o build.js'
]));

gulp.task('scripts', ['runAMDbuild'], function () {
  gulp.src('.build/script/bootstrap.js')
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest('.build/script'));

  return gulp.src('.build/vender/ueditor/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('.build/vender/ueditor'));
});

gulp.task('styless', function () {
  return gulp.src('./.build/styles/*.css')
    .pipe($.csso())
    .pipe(gulp.dest('./.build/styles'));
});


gulp.task('htmls', ['styless'], function () {

  var indexHtmlFilter = $.filter(['**/*', '!**/index.html'], { restore: true });

  return gulp.src(['./.build/index.html'])
    .pipe($.useref())

    .pipe(indexHtmlFilter)
    .pipe($.rev())
    .pipe(indexHtmlFilter.restore())

    .pipe($.rev.manifest())
    .pipe($.revReplace())
    .pipe(gulp.dest('./.build'));
  });

gulp.task('build', ['clean:dist','scripts'], function () {
  runSequence(['htmls']);
});
