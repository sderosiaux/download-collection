var request = require('request');
var util = require('util');
var fs = require('fs');
var path = require('path');
var log = require('debug')('download-collection')
var error = require('debug')('download-collection:error')


// used when opts.rename is set to replace the macro "{counter}" inside
var counter = 1;

module.exports = function(links, opts) {
    // ensure we are pooling the requests a bit
    var doRequest = request.defaults({
        pool: {
            maxSocket: 10
        }
    });

    // merge default options
    util._extend({ baseUrl: '', rename: false }, opts);

    links.forEach(function(link) {
        // ignore empty link
        if (!link) return;

        // create full uri
        var uri = opts.baseUrl + link;

        // do the request !
        var req = doRequest.get(uri)
            .on('response', function(response) {
                // only handle the 200
                if (response.statusCode !== 200) {
                    error(uri + ' statusCode ' + response.statusCode);
                    return;
                }

                // determine the fileName
                // - either from opts.rename
                // - or from the request.uri
                var fileName = (function() {
                    if (opts.rename) {
                        var name = opts.rename;
                        if (name.indexOf('{counter}') >= 0) {
                            name = name.replace('{counter}', counter);
                            counter++;
                        }
                        return name;
                    }

                    return path.basename(response.request.uri.pathname);
                })();

                // some info to know what is downloaded where
                log(uri, 'into', fileName, response.headers['content-type']);

                // now that we have the fileName, stream write the content
                req.pipe(fs.createWriteStream(fileName));
            });
    });
};
