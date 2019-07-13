const gulp = require('gulp');
const terser = require('gulp-terser');
const clean = require('gulp-clean');

//es build
function esbuild(){
  gulp.src('./src/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('./build'));
  gulp.src('./src/options/vs/editor/editor.main.css')
    .pipe(gulp.dest('./build/options/vs/editor'));
  gulp.src('./images/*.*')
    .pipe(gulp.dest('./build/images'));
  gulp.src(['./config/*.*'])
    .pipe(gulp.dest('./build/config'));
  return gulp.src(['./src/**/*.html','manifest.json'])
    .pipe(gulp.dest('./build'));
}

//clean 
async function  prepare(){
  gulp.src('./build', {read: false, allowEmpty: true})
    .pipe(clean());
}
gulp.task('clean', prepare);
gulp.task('esbuild', esbuild);

gulp.task('default', gulp.series('clean','esbuild'));
