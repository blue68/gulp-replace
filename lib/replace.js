'use strict';

var extend = require('util')._extend;
var through = require('through2');
var gulpUtil = require('gulp-util');
var ext = gulpUtil.replaceExtension;
var PluginError = gulpUtil.PluginError;

module.exports = function(options){
  var opts = extend({}, options);

  function StrCompile(file, enc, cb){
    opts.filename = file.path;

    if(file.data){
      opts.data = file.data;
    }
    if(file.isStream()){
      return cb(new PluginError('gulp-replace', 'Streaming not supported'));
    }

    if(file.isBuffer()){
      try {
        var contents = String(file.contents);
        var original = opts.original;
        var target = opts.target;
        for(var key in original){
          var reg = original[key];
          contents = contents.replace(reg, target[key]);
        }
        file.contents = new Buffer(contents);
      } catch(e) {
        return cb(new PluginError('gulp-replace', e));
      }
    }
    cb(null, file);
  }
  return through.obj(StrCompile);
};