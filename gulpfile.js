'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');//帮助自动加载package.json文件里的gulp插件
var browserSync = require('browser-sync');//实时快速响应文件更改
var minifycss = require('gulp-minify-css');
var wiredep = require('wiredep').stream;

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

/*
	版本控制
 */
var pkg = require('./package.json');
var config = {
	base:'app',
	dist:'dist/'+pkg.version,
	//proxyUrl:'http://10.118.200.154:8081'//李顺
	//proxyUrl:'http://10.118.200.27:8081'//胡正强
	//proxyUrl:'http://10.118.192.186:9000'//王小平
	proxyUrl:'http://rap.taobao.org/'
};

var context = '/api'; // requests with this path will be proxied

// configure proxy middleware options
var options = {
	target: config.proxyUrl, 	// target host
	// changeOrigin: true,      // needed for virtual hosted sites
	// ws: true,                // proxy websockets
	pathRewrite: {
		'/api' : '/mockjsdata/16508/'
	}
};

var proxyMiddleware = require('http-proxy-middleware');
var proxy = proxyMiddleware(context, options);

// 语法检查
// gulp.task('jshint', function() {
// 	gulp.src('app/**/*.js')
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('default'));
// });
//编译sass
gulp.task('sass', function(){
	return gulp.src('app/styles/scss/app.scss')
	    .pipe($.plumber())//gulp-plumber错误管理
	    .pipe($.sourcemaps.init())//当scss有各种引入关系时，编译后不容易找到对应scss文件，所以需要生成sourcemap文件，方便修改
	    .pipe($.sass.sync({
	      outputStyle: 'expanded',
	      precision: 10,
	      includePaths: ['.']
	    }).on('error', $.sass.logError))
	    .pipe($.sourcemaps.write())
	    .pipe(gulp.dest('app/styles'))
	    .pipe(reload({stream: true}));
});
gulp.task('minifycss', function() {
	return gulp.src('app/styles/app.css')      //压缩的文件
		.pipe(minifycss())   //执行压缩
		.pipe(gulp.dest(config.dist+"/styles"));   //输出文件夹
});

function lint(files, options) {
  return function() {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
var testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('jsmin',['copydata'],function () {
	gulp.src(['app/**/*.js'])
		.pipe($.uglify({
			//mangle: true,//类型：Boolean 默认：true 是否修改变量名
			mangle: {
				//排除混淆关键字
				except: [
				'require' ,
				'exports' ,
				'module' ,
				'$',
				'app',
				'define',
				'directive',
				'CryptoJS', 
				'angular', 
				'filter',
				'controller'
			]},
			compress: true//类型：Boolean 默认：true 是否完全压缩
			// preserveComments: all //保留所有注释
		}))
		.pipe(gulp.dest(config.dist));
});

gulp.task('copydata', function () {
	gulp.src(['app/**/*.json', 'app/*.html','app/**/**/*.{eot,svg,ttf,woff,woff2}'])
		.pipe(gulp.dest(config.dist));
});

gulp.task('html',function(){
	return gulp.src(['app/**/*.html','!app/*.html'])
    .pipe($.minifyHtml({conditionals:true,loose:true}))
    .pipe(gulp.dest(config.dist))
    .pipe(reload({stream: true}));
});

gulp.task('images', function () {
	return gulp.src('app/images/**/*')
		.pipe($.if($.if.isFile, $.cache($.imagemin({
			progressive: true,
			interlaced: true,
			svgoPlugins: [{cleanupIDs: false}]
		}))
			.on('error', function (err) {
				console.log(err);
				this.end();
			})))
		.pipe(gulp.dest(config.dist + '/images'));
});

gulp.task('wiredep',function(){
	gulp.src('app/styles/scss/*.scss')
        .pipe(wiredep({

        	directory: './bower_components/',
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/styles/scss'));

    gulp.src('app/*.{html,htm}')
        .pipe(wiredep({
            directory: './bower_components/',
            //exclude: ['ionic'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('serve',['sass'],function(){
	browserSync({
	    notify: false,
	    port: 9003,
	    server: {
			baseDir: ['app'],
			routes: {
				'/bower_components': 'bower_components'
			}
	    },
	    middleware: [proxy]
	});

	gulp.watch([
	    'app/**/*.html',
	    'app/*.js',
	    'app/images/**/*',
	    'app/styles/**/*'
	]).on('change', reload);
    
	gulp.watch(['app/styles/scss/**/*.scss'], ['sass']);
	gulp.watch('bower.json', ['wiredep']);
});

gulp.task('serve:dist',function(){
	browserSync({
	    notify: false,
	    port: 9001,
	    server: {
			baseDir: [config.dist]
	    }
	});

	gulp.watch([
	    config.dist+'/**/*.html',
	    config.dist+'/app/*.js',
	    config.dist+'/images/**/*',
	    config.dist+'/styles/**/*'
	]).on('change', reload());
});

gulp.task('build:production', function() {
  return gulp.src(config.dist+'/**/*').pipe($.size({title: 'build', gzip: true}));
});
gulp.task('build',$.sequence('lint',['images','html','jsmin', 'minifycss'],'build:production'));

gulp.task('default', function(){
	gulp.start('serve');
});


