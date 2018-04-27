Replacement for [browser-pack](https://github.com/substack/browser-pack) which collects dependencies while doing a browserify build.

Sample usage:
    browserPackWithDeps = require('browser-pack-with-deps');

    var deps = [];

    var b = browserify({
        basedir: __dirname,
        pack: function(params) {
            params.raw = true;
            params.sourceMapPrefix = '//#';
            var answer = browserPackWithDeps(params);
            answer.on("dep", function(dep) {deps.push(dep);});
        }
    });

    b.transform(require("coffeeify"));
    b.add("./myFile.js");
    var bundle = b.bundle();

    bundle.on('end', function() {
        console.log("Dependencies:", deps);
    });

If `basedir` is passed to `browserify()`, then dependencies will be relative to basedir, otherwise they will be absolute filenames.


[![Greenkeeper badge](https://badges.greenkeeper.io/jwalton/browser-pack-with-deps.svg)](https://greenkeeper.io/)