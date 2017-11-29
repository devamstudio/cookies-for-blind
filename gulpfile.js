'use strict';

//dependencies for build
var gulp = require('gulp');
var sass = require('gulp-sass');
var sass_globbing = require('gulp-sass-glob');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var flatten = require('gulp-flatten')
//dependencies for build END
//dependencies for push
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
//dependencies for push END

//settings
var html = 'dist/';
var plugin_name = 'cfb';
var source = {
	style  : 'dev/assets/style/',
	script : 'dev/assets/js/',
	images : 'dev/assets/images/',
	pug	: 'dev/pug/',
}
var dest_html = {
	style  : html + 'css/',
	script : html + 'js/',
	images : html + 'images/',
	html   : html,
	test   : 'test/'
}
//settings END
//build project
gulp.task('sass', function () {
  return gulp.src( source.style + 'cfb.sass' )
	.pipe(sass_globbing() )
	.pipe(sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
	.pipe(gulp.dest(dest_html.style));
});
gulp.task('script', function() {
	gulp.src( source.script + '*.js')
	.pipe(sourcemaps.init())
		.pipe(concat( plugin_name + '.js'))
	.pipe(sourcemaps.write())
	.pipe( gulp.dest( dest_html.script ) )
});
gulp.task('imagemin', function () {
	return gulp.src( source.images+'*' )
		.pipe( imagemin([
			imagemin.gifsicle( { interlaced: true } ),
			imagemin.jpegtran( { progressive: true } ),
			imagemin.optipng( { optimizationLevel: 5 } ),
			imagemin.svgo( { plugins: [{removeViewBox: true}] } )
		], {verbose: true}))
		.pipe( gulp.dest( dest_html.images ) )
});
gulp.task('pug', function buildHTML() {
	return gulp.src(source.pug+'*.pug')
		.pipe( plumber() )
		.pipe( pug( { pretty: true } ) )
		.pipe( gulp.dest( dest_html.test ) );
});
//build project END
//watchers
gulp.task('watch', function(){
	gulp.watch( source.style+'**/*.sass', ['sass'] ),
	gulp.watch( source.images+'*', ['imagemin'] ),
	gulp.watch( source.pug+'**/*.pug', ['pug'] ),
	gulp.watch( source.script+'**/*.js', ['script'] )
})
//watchers END