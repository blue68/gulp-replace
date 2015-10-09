var path        = require("path");
var fs          = require('fs');
var vfs         = require('vinyl-fs');
var expect      = require('expect.js');
var gulpReplace = require('../lib/replace.js');

describe('gulp-replace', function(){

  var fn = function(fileName, originalStr, targetStr, bufferLen, containStr, results, done){
    var htmlStream = vfs.src(path.join(__dirname, fileName));
    var chunks = [], len = 0;

    var strs = gulpReplace({
      original : {
        htmlTitle : originalStr
      },
      target : {
        htmlTitle : targetStr
      }
    });
    htmlStream.pipe(strs);
    htmlStream.on('data', function(chunk){
      chunks.push(chunk._contents);
      len += chunk._contents.length;
    });
    htmlStream.on('end', function(){
      var bufResults = Buffer.concat(chunks, len).toString();
      expect(len).to.be(bufferLen);
      expect(bufResults).to.contain(containStr);
      expect(bufResults).to.be(results)
      done()
    });
  }

  it("html replace", function(done){
    fn("assets/a.html", /\@{3}HTMLTITLE\@{3}/g, "demo", 87, "demo", "<!DOCTYPE html>\n<html>\n<head>\n  <title>demo</title>\n</head>\n<body>\ntest\n</body>\n</html>", done);
  });

  it("css resplace", function(done){
    fn("assets/a.css", /\@{3}IMGURL\@{3}/g, "test.gif", 36, "test.gif", "body{\n  background: url(test.gif);\n}", done);
  });

  it("js replace", function(done){
    fn("assets/a.js", /\@{3}JSTEST\@{3}/g, "test-js", 50, "test-js", 'var test = function(){\n  console.log("test-js");\n}', done);
  });

});