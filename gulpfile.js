var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat-util'),
    package = require('./package.json');

var paths = {
        src: 'src/' + package.name + '.js',
        dist: 'dist/' + package.name + '.js',
        output: 'dist/'
    },
    header =  '// ' + package.title + ' - ' + package.author + '\n' +
            '// ' + package.repository.url + ' - MIT License\n';

gulp.task('minify', ['lint'], function(){
    return gulp.src(paths.src)
        .pipe(concat.header(header))
        .pipe(gulp.dest(paths.output))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('lint', function(){
    return gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
});