var NZBApi = require('nzb-api');
var _ = require('underscore');

// Do some setup
var nzbApi = new NZBApi({
  apiEndPoint: process.env['NZB_API_APIENDPOINT'],
  apiKey: process.env['NZB_API_APIKEY']
});

nzbApi.searchAll('jack johnson', false)
  .then(function(result) {
    if (result.length == 0) {
      throw new Error('no results found');
    }
    return _.filter(result,  function(item) {
      return (item.hasOwnProperty('group_name') && item.group_name.indexOf('alt.binaries.sounds.mp3') > -1);
    });
  }).then(function(result) {
    return _.pluck(result, 'name');
  }).then(function(result) {
    console.log(result);
  }).catch(function(err) {
    console.log(err);
  }).done();
