const gulp = require('gulp');
const terser = require('gulp-terser');

function es(){
  return gulp.src('./src/*/*.js')
    .pipe(terser())
    .pipe(gulp.dest('./build'))
}

gulp.task('default', es);