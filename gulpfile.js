var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	// postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('sass', function() {
	
	return gulp.src('./app/scss/style.scss')
        
        // Initialise sourcemaps prior to compiling SASS.
        .pipe(sourcemaps.init())
		
        // Compile SASS.
		.pipe(sass().on('error', sass.logError))
        
        // Write sourcemap inline.
        .pipe(sourcemaps.write())    
    
		// Reinitialise sourcemaps, loading inline sourcemap.
        .pipe(sourcemaps.init({loadMaps: true}))

        // Run compiled CSS through autoprefixer.
        .pipe(autoprefixer())
    
        // Write sourcemap to a separate file.
        .pipe(sourcemaps.write('./'))        
    
		.pipe(gulp.dest('./app/scss'));
	
});

gulp.task('watch', function () {
	
	browserSync.init({
		server: "./app"
			});
	
  	watch('./app/**/*.html', function() {
		browserSync.reload();
		});
	
  	watch('./app/**/*.scss', function() {
		gulp.start('inject');
				
		}); 
});

gulp.task('inject', ['sass'], function() {
	return gulp.src('./app/scss/style.css')
		.pipe(browserSync.stream());
});