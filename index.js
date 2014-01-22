"use strict";

var path = require('path');
var through = require('through');

module.exports = exports = function(params, packFn) {
    if(!packFn) {
        packFn = require('browser-pack');
    }

    var pack = packFn(params);

    var origWrite = pack.write;
    pack.write = function(row) {
        var dep = row.sourceFile;
        if (params.basedir) {
            dep = path.relative(params.basedir, row.sourceFile);
        }
        pack.emit('dependency', dep);

        origWrite.call(pack, row);
    }

    return pack;
};
