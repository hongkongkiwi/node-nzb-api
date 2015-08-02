# nzb-api
A simple implementation of the NZB api that's used by many Newsbin indexers.

### To Install

`npm install nzb-api`

Before using you will need to setup some options, for example:

```
var nzbGet = require('nzb-api');

var nzbApi = new NZBApi({
  apiEndPoint: "https://yourindexer.com",
  apiKey: "YOURAPIKEY"
});
```

### Using NZB-Api methods

#### With traditional node.js callbacks

Once you have the nzbApi object you can make the calls using the following:

```
// Get the capabilities of the server
nzbApi.getCapabilities(function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});

// Register a new account (not all servies support this function)
nzbApi.registerAccount(emailAddress, function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});

// Search for everything
// returnExtended = true (show extended details)
nzbApi.searchAll(name, returnExtended, function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});

// Search for tv shows/episodes
// returnExtended = true (show extended details)
// season = XX (season number)
// episode = XX (episode number)
nzbApi.searchTv(name, returnExtended, season, episode, function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});

// Search for movies using the imdbId
// returnExtended = true (show extended details)
// categories = [] (array of categories to search)
nzbApi.searchMovies(imdbId, returnExtended, categories, function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});

// Get details about an Newsbin file by ID
nzbApi.getNzbDetails(nzbId, function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});

// Download the Newsbin file by ID
nzbApi.downloadNzb(nzbId, function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});
```

#### With promises (powered by Q)

```
// Get the capabilities of the server
nzbApi.getCapabilities().then(result) {
  console.log(result);
.error(function(err) {
  console.error(err);
});
```

All functions are promise enabled.

### Testing

First you will need to set the bash variables:

```
export NZB_API_APIENDPOINT="http://some.nzb.indexer.com/api"
export NZB_API_APIKEY="YOURAPIKEY"
```

Then run `npm test` to run the tests.

### License

This project is under the MIT License. See [license file](https://raw.githubusercontent.com/hongkongkiwi/node-nzb-api/master/LICENSE) for more details.

### Contributing

Please send a pull request if you have any additions to the library.
