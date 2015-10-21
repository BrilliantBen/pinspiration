var gulp = require('gulp'),
		browserify = require('browserify'),
		buffer = require('gulp-buffer'),
		compass = require('gulp-compass'),
		gutil = require('gulp-util'),
		jshint = require('gulp-jshint'),
		source = require('vinyl-source-stream'),
		sourcemaps = require('gulp-sourcemaps'),
		stylish = require('jshint-stylish'),
		uglify = require('gulp-uglify'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task('lint', function(){
	return gulp.src('./_js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['lint'], function(){
	var bundler = browserify({
		entries: ['./_js/app.js'],
		debug: true
	});

	return bundler.bundle()
		.on('error', function(err) {
			gutil.log(err.message);
			gutil.beep();
			this.emit('end');
		})
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./', {
    	sourceRoot: '../'
    }))
		.pipe(gulp.dest('./js'));
});

gulp.task('styles', function(){
	return gulp.src('./_scss/*.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: './css',
			sass: '_scss',
			environment: 'production'
		}))

		.on('error', function(err){
			gutil.log(err.message);
			gutil.beep();
			this.emit('end');
		})
		.pipe(autoprefixer({
        	browsers: ['last 2 versions'],
            cascade: false
        }))

		.pipe(gulp.dest('./css'));
});



gulp.task('watch', ['scripts', 'styles'], function(){
	gulp.watch(['_js/**/*.js','_hbs/**/*.hbs'], ['scripts']);
	gulp.watch(['_scss/**/*.scss'], ['styles']);
});
