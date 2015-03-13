var download = require('./src/download.js');

// handle: cat urls | node app.js

var stdin = '';
process.stdin.resume()
    .setEncoding('utf-8')
    .on('data', function(chunk) {
        stdin += chunk;
    })
    .on('end', function() {
    	var links = stdin.split('\n').map(function(str) { return str.trim(); });
        download(links, {
        	rename: '', // 'image-{counter}.jpg'
            baseUrl: '' // 'http://www.mypic/'
        });
    });

