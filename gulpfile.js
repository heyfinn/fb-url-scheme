var gulp = require("gulp");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jsMinify = require('gulp-minify');
var htmlMinify = require('gulp-htmlmin');

var paths = {
  scripts: ["src/*.js"],
  htmls: ["src/*.html"],
  others: ["src/manifest.json", "src/*.png"]
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(jsMinify({
      ext: {
        min: '.js'
      }
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build"));
});

gulp.task('htmls', function() {
  return gulp.src(paths.htmls)
    .pipe(sourcemaps.init())
    .pipe(htmlMinify({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp.src(paths.others)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build"));
});

gulp.task('default', ['scripts', "htmls", "copy"]);
