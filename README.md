# nzbget-api
A complete NZBGet API implementation library with extensive tests.

### To Install

`npm install nzbget-api`

### To Use

```
var nzbGet = require('nzbget-api');

var options = {
  host: '127.0.0.1',
  port: 6789,
  login: 'yourusername',
  hash: 'yourpassword'
}

var nzbGet = new NZBGet(options);
```

Once you have the nzbGet object you can make the calls using the following:

```
// Get the NZBGet server version
nzbGet.version(function(err, result) {
  console.log(result.version);
});

// Reload the server
nzbGet.reload(function(err, result) {
});

// Shutdown the server
nzbGet.shutdown(function(err, result) {
});

// List groups
nzbGet.listGroups(function(err, result) {
});

// Get History (without hidden)
nzbGet.history(false, function(err, result) {
});
```

Have a look at the [NZBGet API](https://github.com/nzbget/nzbget/wiki/API) for a full list of functions.

### Testing

`npm test`

The testing is done with mocha and nock with saved JSON responses. You do not need a live server to perform the tests.

### License

This project is under the MIT License. See [license file](https://raw.githubusercontent.com/hongkongkiwi/nzbget-api/master/LICENSE) for more details.

### Contributing

Please send a pull request if you have any additions to the library.
