var gulp = require('gulp');

// sass
var sass = require('gulp-sass');
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});
 
gulp.task('sass:watch', function () {
    gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
});

// babel
const babel = require('gulp-babel');
gulp.task('babel', () =>
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/js-babel'))
);

// file-include
var fileinclude = require('gulp-file-include');
gulp.task('fileinclude', function() {
  return gulp.src(['app/html/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('fileinclude:watch', function () {
    gulp.watch('app/html/**/*.html', gulp.series('fileinclude'));
});

// copy
gulp.task('copy', copyTask);
function copyTask(done) {
    gulp.src('app/*.html', {base: 'app'}).pipe(gulp.dest('build'));
    gulp.src('app/img/**/*', {base: '.app'}).pipe(gulp.dest('build'));
    gulp.src('app/css/**/*', {base: 'app'}).pipe(gulp.dest('build'));
    gulp.src('app/js-babel/**/*', {base: 'app/js-babel'}).pipe(gulp.dest('build/js'));
    done();
}

gulp.task('run', gulp.parallel('sass:watch', 'fileinclude:watch'));
gulp.task('build',gulp.series('sass', 'babel', 'copy'));