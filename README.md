Download the content from a list of urls automatically.

# How to : as a dependency

```
var download = require('download-collection');
download([ 'http://c4.staticflickr.com/8/7585/16171080784_3d3a169714_h.jpg' ]);
```

# Options

`download()` takes 2 parameters :
- an array of urls (strings)
- an optional configuration object :

```javascript
download(links, {
	rename: 'image-{counter}.jpg'
    baseUrl: 'http://www.mypic.com/'
});
```

- `rename`: you can provide a name and `{counter}` will be automatically increased for each file.
- `baseUrl`: prefix for the urls to use if you don't specify it in the array of urls

# How to : as a command

By default, the app reads stdin and downloads the content from the provided urls (one line = one url).

```
$ cat urls | node app.js
  download-collection http://c4.staticflickr.com/8/7585/16171080784_3d3a169714_h.jpg +0ms into 16171080784_3d3a169714_h.jpg image/jpeg
  download-collection https://farm8.staticflickr.com/7585/16797177115_6eb78d6009_b.jpg +123ms into 16797177115_6eb78d6009_b.jpg image/jpeg
```

