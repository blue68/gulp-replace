# gulp-str-replace  [![Build Status](https://travis-ci.org/blue68/gulp-replace.svg?branch=master)](https://travis-ci.org/blue68/gulp-replace)

A string replace plugin for gulp

# Install

Install using [npm](https://npmjs.org/package/gulp-str-replace).

```
npm install gulp-str-replace --save-dev

```

# Usage

```js

var gulp    = require('gulp');
var replace = require('gulp-str-replace');

gulp.task("str-replace", function(){
    gulp.src([paths.build + "/**/*.html", paths.build + "/**/*.css"])
    .pipe(replace({
        original : {
            activityVersion : /\@{3}ACTIVITY_VERSION\@{3}/g,
            lotusVersion : /\@{3}LOTUS_VERSION\@{3}/g
        },
        target : {
            activityVersion : "0.0.2",
            lotusVersion : "0.0.3"
        }
    }))
    .pipe(gulp.dest(paths.build))
});

gulp.task('default', ['str-replace']);

```